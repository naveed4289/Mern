const express = require("express")
const Product=require("../models/product-model")

const AddProduct = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);
        console.log("File:", req.file);

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.file.path, // Assuming you're storing the file path
        });

        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error("AddProduct Error:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
};

// Add Product Function
// const AddProduct = async (req, res) => {
//     try {
//         const { name, description, price, quantity } = req.body;
//         const imagePath = req.file ? req.file.path : null;

//         if (!imagePath) {
//             return res.status(400).json({ message: "Image is required" });
//         }

//         const newProduct = new Product({
//             name,
//             description,
//             price,
//             quantity,
//             image: imagePath
//         });

//         await newProduct.save();

//         return res.status(200).json({ message: "Product added successfully", product: newProduct });

//     } catch (error) {
//         console.error("Error adding product:", error); // Log error for debugging
//         return res.status(500).json({ message: "Product not added", error: error.message });
//     }
// };

// const AddProduct=async(req,res)=>{ 

//     try {
//         const response=req.body;
//         await Product.create(response);
//         return res.status(200).json({message:"Product added successfully"})
        
//     } catch (error) {
//         return res.status(500).json({message:"Product not added"})
//     }
// }

const searchProducts = async (req, res) => {
    try {
        const query = req.query.q || '';
        const regex = new RegExp(query, 'i'); // Case-insensitive search
        
        const products = await Product.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        });

        res.status(200).json({ response: products });
    } catch (error) {
        console.error("Search Products Error:", error);
        res.status(500).json({ error: "Failed to search products" });
    }
};


const getAllProduct=async(req,res)=>{
    try {
       
        const response=await Product.find();
        if(!response){
            return res.status(404).json({message:"No Product find"})
        }
        return res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Product.deleteOne({_id: id});
        if (deleteProduct.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
}
const getProductById=async(req,res,next)=>{
    try {
        const id = req.params.id;
        const data=await Product.findOne({_id:id})
        return res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
} 
const UpdateProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateProductData = req.body;
        
        // If a new image file is provided
        if (req.file) {
            updateProductData.image = req.file.path;
        }

        const updatedData = await Product.updateOne({ _id: id }, { $set: updateProductData });

        if (updatedData.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not found or no changes made" });
        }

        return res.status(200).json({ updatedData });
    } catch (error) {
        next(error);
    }
};


// const UpdateProductById = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const updateProductData = req.body;
//         const updatedData = await Product.updateOne({ _id: id }, { $set: updateProductData });

//         if (updatedData.modifiedCount === 0) {
//             return res.status(404).json({ message: "Product not found or no changes made" });
//         }

//         return res.status(200).json({ updatedData });
//     } catch (error) {
//         next(error);
//     } 
// };

module.exports={AddProduct,getAllProduct,deleteProductById,getProductById,UpdateProductById,searchProducts}