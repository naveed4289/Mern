import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";

function AdminupdateProduct() {
    const { authorizationToken } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: null // Add state for image file
    });

    const fetchproductData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setProductData({
                name: data.data.name,
                description: data.data.description,
                price: data.data.price,
                quantity: data.data.quantity,
                image: data.data.image // Set image URL or file if available
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFileChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] }); // Handle image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('quantity', productData.quantity);
        if (productData.image) {
            formData.append('image', productData.image); // Append image file
        }

        try {
            const response = await fetch(`http://localhost:3000/api/admin/products/update/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authorizationToken,
                },
                body: formData,
            });
            if (response.ok) {
                navigate('/admin/product');
                toast.success("Update successfully");
            } else {
                console.error("Update failed:", await response.json());
            }
        } catch (error) {
            console.error("Update request error:", error);
        }
    };

    useEffect(() => {
        fetchproductData();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Edit Product</h2>
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="price" className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="image" className="block text-gray-700 mb-2">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {productData.image && typeof productData.image === 'string' && (
                        <img src={`http://localhost:3000/${productData.image}`} alt="Product" className="mt-4 w-full h-auto" />
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default AdminupdateProduct;
