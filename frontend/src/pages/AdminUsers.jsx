import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

function AdminUsers() {
    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);

    const getAllUsersData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/user', {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        } 
    };

   
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/user/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Delete failed:", errorData);
            } else {
                const data = await response.json();
                console.log(data);
                getAllUsersData();
            }
        } catch (error) {
            console.error("Delete request error:", error);
        }
    };
    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen p-6">
            <div className="w-full h-full bg-white shadow-md rounded-lg overflow-hidden p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Users Data</h2>
                <div className="h-full overflow-y-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Update</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users.map((curElem, index) => (
                                <tr key={index} className="border-b last:border-none">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{curElem.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curElem.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curElem.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                                        <Link to={`/admin/users/${curElem._id}/edit`}>Edit</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 hover:underline">
                                        <button onClick={() => deleteUser(curElem._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminUsers;
