import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AdminProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: null,
    });
    const [products, setProducts] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllProductsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/product/data', {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setProducts(data.response);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", formData.name);
        form.append("description", formData.description);
        form.append("price", formData.price);
        form.append("quantity", formData.quantity);
        form.append("image", formData.image);
    
        try {
            const response = await fetch("http://localhost:3000/api/admin/addProduct", {
                method: "POST",
                headers: {
                    "Authorization": authorizationToken,
                },
                body: form,
            });
            const result = await response.json();
            if (response.ok) {
                toast.success("Product added successfully");
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    image: null,
                });
                getAllProductsData();
            } else {
                console.error("API error:", result);
                toast.error(result.message || "Failed to add product");
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/product/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorizationToken,
                },
            });
            if (!response.ok) {
                const errData = await response.json();
                console.error("Delete Failed", errData);
                toast.error(errData.message || "Failed to delete product");
            } else {
                const data = await response.json();
                toast.success(data.message);
                getAllProductsData();
            }
        } catch (error) {
            console.error("Delete request error:", error);
            toast.error("An error occurred while deleting the product");
        }
    };

    useEffect(() => {
        getAllProductsData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex items-center justify-center p-6 bg-white shadow-lg rounded-lg">
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter product description"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter product price"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter product quantity"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            className="w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col items-center p-6 mt-6">
                <h2 className="text-2xl font-bold mb-6">Product List</h2>
                <div className="w-full max-w-4xl">
                    {products.map((product) => (
                        <div key={product._id} className="flex items-center justify-between bg-white shadow-md rounded-lg mb-4 p-4">
                            <div className="flex items-center">
                                <img
                                    src={`http://localhost:3000/${product.image}`}
                                    alt={product.name}
                                    className="w-16 h-16 mr-4 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="text-gray-600">{product.description}</p>
                                    <p className="text-gray-800 font-bold">Price: {product.price}</p>
                                    <p className="text-gray-800 font-bold">Quantity: {product.quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link to={`/admin/products/${product._id}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    Update
                                </Link>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminProduct;
