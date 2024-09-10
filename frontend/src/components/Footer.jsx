import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto ">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="mb-2"><i className="fas fa-phone-alt mr-2"></i>(+123) 456-7890</p>
                        <p className="mb-2"><i className="fas fa-envelope mr-2"></i>info@yourbrand.com</p>
                        <p><i className="fas fa-map-marker-alt mr-2"></i>123 Main Street, Your City, Your Country</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                        <ul>
                            <li className="mb-2">
                                <NavLink 
                                    to="/" 
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/about" 
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/services" 
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    Services
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/contact" 
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/faq" 
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    FAQ
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                        <p className="mb-4">Stay updated with our latest news and offers.</p>
                        <form>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-3"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-gray-700 pt-8 text-center">
                    <p className="text-gray-400">© 2024 YourBrand. All rights reserved.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <a 
                            href="https://twitter.com/yourprofile" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a 
                            href="https://facebook.com/yourprofile" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a 
                            href="https://instagram.com/yourprofile" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a 
                            href="https://linkedin.com/in/yourprofile" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
