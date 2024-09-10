import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, LogoutUser, user } = useAuth();
  const navigate = useNavigate();
const{id}=useParams();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await LogoutUser();
    toggleDropdown();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo text-2xl font-bold">
          <NavLink to="/" className="hover:text-gray-400">
            SHOPIE
          </NavLink>
        </div>
        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Navigation Links */}
        <ul
          className={`md:flex space-x-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0 transition-transform duration-300 ${isOpen ? "block" : "hidden"
            }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-red-700 font-bold" : "hover:text-gray-400"
              }
              exact="true"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-red-700 font-bold" : "hover:text-gray-400"
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                isActive ? "text-red-700 font-bold" : "hover:text-gray-400"
              }
              onClick={toggleMenu}
            >
              Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-red-700 font-bold" : "hover:text-gray-400"
              }
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2 text-white">
                <span>Welcome, {user ? user.username : "Guest"}</span>
                <FaChevronDown />
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-48">
                  <li>
                  <NavLink
                      to={`/show/${user._id}/edit`}  
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                      onClick={() => {
                        toggleDropdown();
                        setIsOpen(false);
                      }}
                    >
                      Edit Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-white font-bold rounded-full px-6 py-2 text-center"
                      : "bg-blue-600 hover:text-blue-200 text-white font-bold rounded-full px-6 py-2 text-center"
                  }
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-white font-bold rounded-full px-6 py-2 text-center"
                      : "bg-blue-600 hover:text-blue-200 text-white font-bold rounded-full px-6 py-2 text-center"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
