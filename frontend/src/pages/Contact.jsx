import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Contact() {
  const { user } = useAuth();
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: "", // Keep message field empty initially
      });
    }
  }, [user]);

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/form/contact", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact((prevContact) => ({
          ...prevContact, // Preserve username and email
          message: "", // Reset message field only
        }));

        const responseData = await response.json();
        toast.success("Message sent successfully!", { autoClose: 2000 });
        console.log(responseData);
      } else {
        console.error("API Error:", response.status, response.statusText);
        toast.error("Failed to send message. Please try again.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", { autoClose: 2000 });
    }
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          {/* Contact Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username || ""} // Ensure value is always a string
                  onChange={handleInput}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email || ""} // Ensure value is always a string
                  onChange={handleInput}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message || ""} // Ensure value is always a string
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  ); 
}

export default Contact;
