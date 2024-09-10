import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const { storeTokenInLocalStorage } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
  
      if (response.ok) {
        storeTokenInLocalStorage(data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registration successful!", { autoClose: 2000 });
        navigate("/");
      }  else {
        // Handle other errors
        const errorMessage = data.extraDetails 
                             ? data.extraDetails.join(', ')
                             : data.message;
        toast.error(errorMessage, { autoClose: 3000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred. Please try again later.", { autoClose: 2000 });
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[1000px] h-[600px] flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 flex justify-center items-center p-4">
          <img
            src="img/register.png"
            alt="Sign Up"
            className="w-full h-auto max-w-full max-h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center bg-blue-50">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Sign Up Here</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                onChange={handleInput}
                value={user.username}
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                onChange={handleInput}
                value={user.email}
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone</label>
              <input
                type="tel"
                onChange={handleInput}
                value={user.phone}
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                onChange={handleInput}
                value={user.password}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign Up
              </button>
              <p className="mt-4 text-gray-700">
                Already have an account?{' '}
                <NavLink
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Login here
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
