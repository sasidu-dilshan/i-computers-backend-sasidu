import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {

	try {

        if (isAdmin(req)) {

            const product = new Product(req.body);
            await product.save();
            res.json({ message: "Product created successfully" });

        }else{
            res.status(403).json({ message: "You need login as and admin to create products" });
            return
        }
		
	} catch (error) {
		console.error("Error creating product:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function getAllProducts(req, res) {
    console.log("Fetching all products");
    try {
        if(isAdmin(req)){

            const products = await Product.find();
            res.json(products);
        

        }else{

            const products = await Product.find({ isAvailable : true });
            res.json(products);

        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.json({ message: "Internal server error" });
    }
}

export async function deleteProduct(req, res) {

    try{

        const productId = req.params.productId

        if(isAdmin(req)){

            const product = await Product.findOne({ productId : productId })

            if(product == null){
                res.status(404).json({ message: "Product does not exist" });
                return
            }

            await Product.findOneAndDelete({productId : productId})

            res.json({ message: "Product deleted successfully" });

        }else{
            res.status(403).json({ message: "You need login as and admin to delete products" });
            return
        }

    }catch(error){
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export async function updateProduct(req, res) {
    try{

        const productId = req.params.productId

        if(isAdmin(req)){
            const product = await Product.findOne({ productId : productId })

            if(product == null){
                res.status(404).json({ message: "Product does not exist" });
                return
            }

            await Product.findOneAndUpdate({productId : productId} , req.body)

            res.json({ message: "Product updated successfully" });
        }else{
            res.status(403).json({ message: "You need login as and admin to update products" });
            return
        } 

    }catch(error){
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function getProductById(req, res) {

    try{

        const productId = req.params.productId

        const product = await Product.findOne({ productId : productId })

        if(product == null){
            res.status(404).json({ message: "Product does not exist" });
            return
        }

        if(product.isAvailable){

            res.json(product);

        }else{

            if(isAdmin(req)){

                res.json(product);

            }else{
                res.status(404).json({ message: "Product does not exist" });
                return
            }

        }

    }catch(error){
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function searchProducts(req, res) {

    try{

        const query = req.params.query

        // const category = req.query.category

        //if category == all

        const products = await Product.find(
            {
                $or : [
                    { name : { $regex : query , $options : "i" } },
                    { description : { $regex : query , $options : "i" } },
                    { altNames : { $elemMatch : { $regex : query , $options : "i" } } }
                ],
                // category : category === "all" ? { $exists : true } : category               
            }
        )
        res.json(products);

    }catch(error){
        console.error("Error searching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}