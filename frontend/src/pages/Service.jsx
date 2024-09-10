import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

function Service() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { authorizationToken } = useAuth();
  const [quantities, setQuantities] = useState({});

  // Function to fetch products based on search term
  const getProduct = async (search = '') => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/product/search?q=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.response) {
          const formattedData = data.response.map(item => ({
            ...item,
            imageUrl: item.image ? item.image.replace(/\\/g, '/') : '' // Handle undefined image
          }));
          setProducts(formattedData);
        } else {
          console.log("No products found or 'response' is undefined in the response.");
          setProducts([]); // Clear products if response is empty or undefined
        }
      } else {
        console.log("Failed to fetch products");
        setProducts([]); // Clear products if response is not OK
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      setProducts([]); // Clear products in case of error
    }
  };

  // Fetch products initially
  useEffect(() => {
    getProduct();
  }, []);

  // Update products list as the search term changes
  useEffect(() => {
    getProduct(searchTerm);
  }, [searchTerm]);

  // Handle search term input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle quantity change for each product
  const handleQuantityChange = (index, change) => {
    setQuantities(prev => ({
      ...prev,
      [index]: (prev[index] || 1) + change > 0 ? (prev[index] || 1) + change : 1
    }));
  };

  return (
    <section className="section-services">
      <div className="container mx-auto p-4 my-8">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((curElem, index) => {
            const { name, description, price, imageUrl } = curElem;
            const quantity = quantities[index] || 1;
            return (
              <div
                className="card bg-white shadow-lg rounded-lg p-4 transform transition-all hover:scale-105"
                key={index}
                style={{ width: '300px', height: '350px' }}
              >
                <div className="card-img mb-4">
                  <img
                    src={imageUrl ? `http://localhost:3000/${imageUrl}` : 'https://via.placeholder.com/300x150'}
                    alt={name}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ width: '300px', height: '150px' }}
                  />
                </div>
                <div className="card-details">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-lg">{name}</p>
                    <div className="flex items-center">
                      <button
                        className="text-lg font-bold text-gray-700 px-2"
                        onClick={() => handleQuantityChange(index, -1)}
                      >
                        -
                      </button>
                      <p className="text-lg mx-2">{quantity}</p>
                      <button
                        className="text-lg font-bold text-gray-700 px-2"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 mb-2">{description}</p>
                  <h2 className="text-xl font-bold text-blue-500 mb-2">${price}</h2>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★★★★★</span>
                    <p className="text-gray-500">(5.0)</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No Products available</p>
        )}
      </div>
    </section>
  );
}

export default Service;
