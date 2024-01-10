import React, { useState ,useEffect} from 'react'
import shoplogo from "../assets/shoplogo.png"
import { BsCartFill } from "react-icons/bs";
import { Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutLink } from '../api_calls/userApi';

const Navbar = () =>
{

    const navigate = useNavigate();
    const [userMenu, setuserMenu] = useState(false);
    const data = useSelector((state) => state.user.user);
   
    

    const [user, setuser] = useState({});
    useEffect(() => {
        setuser(data);
    }, [data]);

    // const [userRole, setuserRole] = useState('admin');
    const [searchProduct, setsearchProduct] = useState("");
    console.log(user?.role);

    // Move setuser(data) inside a useEffect to avoid infinite rendering
   

    console.log("user",user);


    
    const handleSearch = () => {
        navigate(`/search?product=${searchProduct}`);
    }

    const checkUserExists = () => {
        if (!data)
        {
            navigate("/login");
        }
    }
    const handleLogout = async() =>
    {
        const response = await axios.get(logoutLink,{withCredentials:true});
        if (response.data.success == true)
        {
            navigate("/login");
        }
    }
  return (
      <>
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                  <Link
                      href="/"
                      className="flex items-center space-x-3 rtl:space-x-reverse mb-1"
                  >
                      <img
                          src={shoplogo}
                          className="h-8"
                          alt="Flowbite Logo"
                      />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                          Ecommerce
                      </span>
                  </Link>
                  <input
                      name='search'
                      placeholder='Search products'
                      className='mt-2 w-[380px] h-[30px] py-2 px-2 rounded-md mb-2'
                      onChange={(event) => { setsearchProduct(event.target.value) }}
                      value={searchProduct}
                  />
                  <button
                      className="bg-blue-500 text-white py-1 px-4 rounded-md ml-2 md:ml-[-140px]"
                      onClick={handleSearch}
                  >
                      Search
                  </button>
                  <div className="flex md:flex-col md:justify-center items-center md:order-2 space-x-3 md:space-x-0 " onClick={()=>{checkUserExists()}}>
                      
                          <img
                          className="w-8 h-8 rounded-full flex justify-center"
                          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.1457610252.1704191878&semt=ais"
                          alt="user photo"
                          onClick={() => { setuserMenu(!userMenu) }}
                          
                          />
                      {
                          userMenu ? (<>
                              <div
                                  className="z-50 absolute top-[65px] right-[30px]  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                                  id="user-dropdown"
                              >
                                  <div className="px-4 py-3">
                                      <span className="block text-sm text-gray-900 dark:text-white">
                                         {`${user?.firstName} ${user?.lastName}`}
                                      </span>
                                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                          {user?.email}
                                      </span>
                                  </div>
                                  <ul className="py-2" aria-labelledby="user-menu-button">
                                      <li>
                                          <a
                                              href="#"
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                          >
                                              Profile
                                          </a>
                                      </li>


                                      <li>
                                          <Link
                                              onClick={()=>handleLogout()}
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                          >
                                              Sign out
                                          </Link>
                                      </li>
                                  </ul>
                              </div>
                          </>) : (<></>)
                     }
                  </div>
                  <div
                      className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
                      id="navbar-user"
                  >
                     
                      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                          <li>
                              <a
                                  href="#"
                                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                  aria-current="page"
                              >
                                  Home
                              </a>
                          </li>
                          <li>
                              <Link
                                  to={"/search"}
                                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                              >
                                  Products
                              </Link>
                          </li>
                          {
                            //   during production need to apply change here 
                              user && user?.role == 'customer' && 
                              (
                                  <div>
                                      <li>
                                          <Link
                                              to={"/createproduct"}
                                              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                          >
                                              Add Products
                                          </Link>
                                      </li>
                                  </div>
                              )
                          }
                          
                      </ul>
                  </div>
              </div>
          </nav>

             
          </>

      
  )
}

export default Navbar