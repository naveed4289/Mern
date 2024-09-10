import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";

function AdminUpdate() {
    const { authorizationToken } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: ''
    }); 

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/user/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setUserData({
                username: data.data.username,
                email: data.data.email,
                phone: data.data.phone,
            });
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/update/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                navigate('/admin/user');
                toast.success("Update successfully")
            } else {
                console.error("Update failed:", await response.json());
            }
        } catch (error) {
            console.error("Update request error:", error);
        }
    };
    

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Edit User</h2>
                <div className="form-group mb-4">
                    <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
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

export default AdminUpdate;
