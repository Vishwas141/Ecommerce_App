import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'

import {Routes,Route} from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import FrontPage from "./FrontPage.jsx"
import ProductPage from './components/ProductPage.jsx'
import Footer from './components/Footer.jsx'

const  App=()=>
{
  return (
    <>
     
      <Routes>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<FrontPage />} />
        <Route path='/search' element={<ProductPage />} />

      </Routes>
    
    
  </>)
}

export default App
