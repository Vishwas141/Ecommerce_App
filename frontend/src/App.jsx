import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'

import { useDispatch, useSelector } from 'react-redux';

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
import { fetchUserInfo } from './slice/slice';
import Cart from './components/cart/Cart.jsx';

const  App=()=>
{
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      console.log("called");
      dispatch(fetchUserInfo());
    }
  }, [userStatus, dispatch]);
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

        {/* cart */}
        
        <Route path="/cart" element={<Cart/>}/>


      </Routes>
    
    
  </>)
}

export default App
