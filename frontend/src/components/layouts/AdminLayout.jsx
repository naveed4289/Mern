import React from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from "../../store/auth";

function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>loading....</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to='/' />;
  }

  return (
    <div className="flex min-h-screen">
      <nav className="w-1/4 bg-gray-800 text-white p-6">
        <ul className="space-y-4">
          <li><NavLink to="/admin/users" className="block hover:bg-gray-700 px-3 py-2 rounded">Users</NavLink></li>
          <li><NavLink to="/admin/contacts" className="block hover:bg-gray-700 px-3 py-2 rounded">Contacts</NavLink></li>
          <li><NavLink to="/services" className="block hover:bg-gray-700 px-3 py-2 rounded">Services</NavLink></li>
          <li><NavLink to="/admin/product" className="block hover:bg-gray-700 px-3 py-2 rounded">Products</NavLink></li>
          
        </ul>
      </nav>
      <main className="flex-grow p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
