import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './slice/slice';
import ProductPage from './components/ProductPage'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const FrontPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  
  useEffect(() => {
    if (userStatus === 'idle')
    {
      console.log("called");
      dispatch(fetchUserInfo());
    }
  }, [userStatus, dispatch]);

  console.log("frontend ", user);


  return (
    <div>
      <Navbar/>
      <ProductPage />
      <Footer/>
    
    </div>
  )
}

export default FrontPage
