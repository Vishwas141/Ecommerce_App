import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'

import {Routes,Route} from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import FrontPage from "./FrontPage.jsx"
import ProductPage from './components/ProductPage.jsx'
import Footer from './components/Footer.jsx'
import SearchProduct from './components/product/searchProduct.jsx'
import CreateProduct from './components/product/CreateProduct.jsx'
import ProductDetail from './components/product/ProductDetail.jsx'
import EditProduct from './components/product/EditProduct.jsx'

const  App=()=>
{
  return (
    <>
     
      <Routes>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<FrontPage />} />
        <Route path='/search' element={<SearchProduct/>} />


        {/* product Realted  */}

        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/edit/:productId" element={<EditProduct/>} />




      </Routes>
    
    
  </>)
}

export default App
