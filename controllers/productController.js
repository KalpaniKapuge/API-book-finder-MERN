import Product from "../models/product.js";

export function getProducts(req, res) {
    Product.find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to get products" });
        });
}

export function saveProducts(req, res) {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    product.save()
        .then(() => {
            res.json({
                message: "Product saved successfully"
            });
        })
        .catch(() => {
            res.json({
                message: "Failed to add product"
            });
        });
}
