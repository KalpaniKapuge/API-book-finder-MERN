import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

// Get all products
export async function getProducts(req, res) {
    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products)
        }else{
            const products = await Product.find({isAvailable : true})
            res.json(products)
        }
    }catch(err){
        res.json({
            message : "Failed to get products",
            error : err
        })
    }
}



// Get a single product by productId
export async function getProductById(req, res) {
    const productId = req.params.productId;

    try {
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.isAvailable || isAdmin(req)) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to get product",
            error: err.message
        });
    }
}

// Save (add) a new product
export async function saveProducts(req, res) {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                message: "Unauthorized: Admin access required"
            });
        }

        const product = new Product(req.body);
        await product.save();

        res.json({
            message: "Product saved successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to add product",
            error: err.message
        });
    }
}

// Delete a product
export async function deleteProduct(req, res) {
    try {
        if (!isAdmin(req)) {
            return res.status(403).json({
                message: "Unauthorized: Admin access required"
            });
        }

        const result = await Product.deleteOne({ productId: req.params.productId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({
            message: "Product deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete product",
            error: err.message
        });
    }
}

// Update a product
export async function updateProduct(req, res) {
    try {
        if (!isAdmin(req)) {
            return res.status(403).json({
                message: "Unauthorized: Admin access required"
            });
        }

        const productId = req.params.productId;
        const updatingData = req.body;

        const result = await Product.updateOne({ productId }, updatingData);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({
            message: "Product updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}
