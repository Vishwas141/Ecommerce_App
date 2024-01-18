import React, { useEffect,useState } from 'react'

import { getCart } from '../../api_calls/cartApi';
import axios from 'axios';
import CartCard from './CartCard';

const Cart = () =>
{
  const [cartProduct, setsearchProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    try
    {
      const fetchProduct = async()=>
      {
        const data = await axios.get(getCart, { withCredentials: true });
      
        setsearchProduct(data.data.data);
        setTotalAmount(data.data.totalAmount);
      }
      fetchProduct();
    }
    catch (err)
    {
      console.log(err);
    }
  }, []);

  return (
      <div>
      <>
      
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {
                 cartProduct.map((product) => {
                  return (
                      <CartCard key={product._id} product={product} />
                  )
                })
              }
            
            </div>
            
            {/* Sub total */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${totalAmount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$50.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">$1{totalAmount + 50.00}</p>
                  <p className="text-sm text-gray-700">including Shipping charges</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      </>

      </div>
  )
}

export default Cart