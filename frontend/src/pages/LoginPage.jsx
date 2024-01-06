import React,{useState} from 'react';
import { Link} from 'react-router-dom';
import { loginLink } from '../api_calls/userApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerLink } from '../api_calls/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () =>
{
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleUserData = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(loginLink, userData,{withCredentials:true});
            console.log(response);

            // Show success toast
            toast.success('Login successful!', {
                position: 'top-right',
                autoClose: 1000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });

            // Wait for 1 second before navigating
            setTimeout(() => {
                navigate("/");
            }, 3000);




        } catch (err) {
            console.error(err);

            // Show error toast
            toast.error('Login failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Wait for 1 second before navigating
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    };
    return (
        <div className='h-[100vh] flex items-center'>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-1">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage:
                                    'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800")'
                            }}
                        />
                        {/* Col */}
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Login!</h3>
                            <form className="px-8 pt-6 pb-8 mb-2 bg-white rounded">
                                
                                <div className="mb-2">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        name='email'
                                        value={userData.email}
                                        onChange={(event) =>handleUserData(event)}
                                    />
                                </div>
                               
                                <div className="mb-2 md:flex md:justify-between">
                                    <div className="mb-2 md:mr-2 md:mb-0">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                            name='password'
                                            value={userData.password}
                                            onChange={(event) => handleUserData(event)}
                                        />
                                        <p className="text-xs italic text-red-500">
                                            Please choose a password.
                                        </p>
                                    </div>
                                  
                                </div>
                                <div className="mb-4 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Login 
                                    </button>
                                </div>
                                <hr className="mb-3 border-t" />
                                <div className="text-center">
                                    <Link
                                        to="#"
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link
                                        to="/register"
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    >
                                        Not have an account? Regsiter!
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
