import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import About from './pages/About'
import Service from './pages/Service'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import { Logout } from "./pages/logout"
import UserUpdate from "./pages/UserUpdate"
import { Error } from "./pages/Error"
import Footer from "./components/Footer"
import AdminLayout from "./components/layouts/AdminLayout"
import AdminUsers from "./pages/AdminUsers"
import AdminUpdate from "./pages/AdminUpdate"
import AdminProduct from "./pages/AdminProduct"
import AdminupdateProduct from "./pages/AdminupdateProduct"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
function App() {


  return (
    <>

      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/service' element={<Service />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path="/show/:id/edit" element={<UserUpdate />} />
              <Route path="*" element={<Error />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/resetPassword/:Token" element={<ResetPassword />} />

              <Route path="/admin" element={<AdminLayout />}>
                <Route path='users' element={<AdminUsers />} />
                <Route path='users/:id/edit' element={<AdminUpdate />} />
                <Route path='product' element={<AdminProduct />} />
                <Route path='products/:id/edit' element={<AdminupdateProduct />} />
              </Route>

            </Routes>
          </main>
          <Footer /> 
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
