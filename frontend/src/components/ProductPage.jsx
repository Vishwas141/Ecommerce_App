import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import "../Styles/ProductPage.css"
import { useSelector } from 'react-redux';



const ProductPage = () =>
{
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchProduct = searchParams.get('product');
    const data = useSelector((state) => state.user.user);
    const [user, setUser] = useState({});
    const [minValue, setminValue] = useState(0);
    const [maxValue, setmaxValue] = useState(50000);
    const navigate = useNavigate();

    

    const handleRangeChange = (event) =>
    {
        setmaxValue(event.target.value);
        navigate(`/search?product=${searchProduct}&minvalue=${minValue}&maxvalue=${maxValue}`);

    }
    useEffect(() =>
    {
        
        setUser(data);
    },[])


    


  return (
      <div className=' flex flex-wrap'>
          
          <div className='w-3/12 filter flex flex-col sm:flex-wrap gap-10 items-center '>
                 <h2 className='text-[25px] mt-20'>Filters</h2>
              
                  
                  {/* price filtering on the basis of product prices */}
                  <div className=' price ml-3 flex-col flex  xl:gap-5 xl:justify-between '>
                      <h2 className='font-semibold'>PRICE</h2>
                      <div className="relative mb-6 ">  
                          <input
                              
                              id="labels-range-input"
                              type="range"
                              defaultValue={30000}
                              min={0}
                              max={30000}
                              className="w-10/12 h-4 bg-gray-200 rounded-lg  cursor-pointer dark:bg-gray-700"
                              onChange={handleRangeChange}
                          />
                      </div>
                  <div className='minmax flex  gap-3 justify-center '>
                      
                          <label htmlFor='minInput' className='font-semibold'>MIN:</label>
                          <input
                              id='minInput'
                              type='text'
                              className='w-3/12 h-[20px] border-black rounded-md px-2 border-solid'
                              placeholder='00000'
                              value={`$ ${minValue}`}
                          ></input>

                          <label htmlFor='maxInput' className='font-semibold'>MAX:</label>
                          <input
                              id='maxInput'
                              type="text"
                              className='w-[80px] h-[20px] border-black rounded-md px-2'
                              placeholder='00000'
                              value={`$ ${maxValue}`}
                          ></input>

                      </div>

                  </div>

                  
              {/* filtering on the basis of brands */}
              <div className='w-full price ml-3 flex-col flex flex-wrap xl:gap-5 '>
                  <h2 className='font-semibold'>BRANDS</h2>
                  <>
                      
                    
                          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg   dark:text-white">
                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                  <div className="flex items-center ps-3">
                                      <input
                                          id="vue-checkbox"
                                          type="checkbox"
                                          defaultValue=""
                                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      />
                                      <label
                                          htmlFor="vue-checkbox"
                                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 text-black"
                                      >
                                          Oppo
                                      </label>
                                  </div>
                              </li>
                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                  <div className="flex items-center ps-3">
                                      <input
                                          id="react-checkbox"
                                          type="checkbox"
                                          defaultValue=""
                                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      />
                                      <label
                                          htmlFor="react-checkbox"
                                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 text-black"
                                      >
                                          IPhone
                                      </label>
                                  </div>
                              </li>
                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                  <div className="flex items-center ps-3">
                                      <input
                                          id="angular-checkbox"
                                          type="checkbox"
                                          defaultValue=""
                                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      />
                                      <label
                                          htmlFor="angular-checkbox"
                                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 text-black"
                                      >
                                          Samsung
                                      </label>
                                  </div>
                              </li>
                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                  <div className="flex items-center ps-3">
                                      <input
                                          id="laravel-checkbox"
                                          type="checkbox"
                                          defaultValue=""
                                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                      />
                                      <label
                                          htmlFor="laravel-checkbox"
                                          className="w-full py-3 ms-2 text-sm font-medium text-gray-900 text-black"
                                      >
                                          Nokia
                                      </label>
                                  </div>
                              </li>
                          </ul>
                    

                  </>

                  

              </div> 

          </div>


          
              <div className='products flex flex-wrap justify-center items-center gap-7 w-8/12   mt-[70px]'>
                  {
                      arr.map((product, index) => {
                          return (
                              <div key={index}>
                                  <Link to={`/product/${product}`} >
                                      <div className="eachproduct bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 w-[20vw]">
                                          <div className="relative">
                                              <img
                                                  className="w-11/12 mx-auto mt-2"
                                                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                                                  alt="Product Image"
                                              />
                                              {/* <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                                                  SALE
                                              </div> */}
                                          </div>
                                          <div className="p-4">
                                              <h3 className="text-lg font-medium mb-2">Product Title</h3>
                                              <p className="text-gray-600 text-sm mb-4">
                                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
                                                  vel eros fermentum faucibus sit amet euismod lorem.
                                              </p>
                                              <div className="flex items-center justify-between">
                                                  <span className="font-bold text-lg">$19.99</span>
                                                  {
                                                      user && user.role ==='customer' && 
                                                      (
                                                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded">
                                                              Edit
                                                          </button>
                                                     ) 
                                                  }
                                                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded">
                                                      Cart
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </Link>

                              </div>
                          )
                      })
                  }
              </div>
          
          
         
      </div>
  )
}

export default ProductPage;