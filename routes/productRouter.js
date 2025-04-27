import express from "express";
import { getProducts, saveProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", saveProducts);

export default productRouter;
