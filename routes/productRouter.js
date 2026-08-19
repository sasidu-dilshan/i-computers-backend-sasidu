import express from "express";
import { 
  createProduct, 
  deleteProduct, 
  getAllProducts, 
  getProductById, 
  searchProducts, 
  updateProduct,
  addProductReview
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);

productRouter.get("/", getAllProducts);

productRouter.get("/search/:query", searchProducts);

productRouter.delete("/:productId", deleteProduct);

productRouter.put("/:productId", updateProduct);

productRouter.get("/:productId", getProductById);

productRouter.post("/:productId/reviews", addProductReview);

export default productRouter;
