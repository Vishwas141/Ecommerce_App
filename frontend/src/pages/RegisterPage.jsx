import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerLink } from '../api_calls/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const handleUserData = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(registerLink, userData,{withCredentials:true});
           

            // Show success toast
            toast.success('Registration successful!', {
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
            toast.error('Registration failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000, // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Wait for 1 second before navigating
            setTimeout(() => {
                navigate("/register");
            }, 3000);
        }
    };

    return (
        <div className='h-[100vh] '>
            <div className='container mx-auto'>
                <div className='flex justify-center px-6 my-1'>
                    <div className='w-full xl:w-3/4 lg:w-11/12 flex'>
                        <div
                            className='w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg'
                            style={{
                                backgroundImage:
                                    'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800")',
                            }}
                        />
                        {/* Col */}
                        <div className='w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none'>
                            <h3 className='pt-4 text-2xl text-center'>Create an Account!</h3>
                            <form className='px-8 pt-6 pb-8 mb-2 bg-white rounded'>
                                <div className='mb-2 md:flex md:justify-between'>
                                    <div className='mb-2 md:mr-2 md:mb-0'>
                                        <label
                                            className='block mb-2 text-sm font-bold text-gray-700'
                                            htmlFor='firstName'
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                            id='firstName'
                                            type='text'
                                            name='firstName'
                                            placeholder='First Name'
                                            onChange={(event) => handleUserData(event)}
                                            value={userData.firstName}
                                        />
                                    </div>
                                    <div className='md:ml-2'>
                                        <label
                                            className='block mb-2 text-sm font-bold text-gray-700'
                                            htmlFor='lastName'
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                            id='lastName'
                                            type='text'
                                            name='lastName'
                                            placeholder='Last Name'
                                            onChange={(event) => handleUserData(event)}
                                            value={userData.lastName}
                                        />
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <label
                                        className='block mb-2 text-sm font-bold text-gray-700'
                                        htmlFor='email'
                                    >
                                        Email
                                    </label>
                                    <input
                                        className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                        id='email'
                                        type='email'
                                        placeholder='Email'
                                        name='email'
                                        onChange={(event) => handleUserData(event)}
                                        value={userData.email}
                                    />
                                </div>
                                <div className='mb-2'>
                                    <label
                                        className='block mb-2 text-sm font-bold text-gray-700'
                                        htmlFor='mobile'
                                    >
                                        Mobile
                                    </label>
                                    <input
                                        className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                        id='mobile'
                                        type='mobile'
                                        placeholder='Mobile'
                                        name='mobile'
                                        onChange={(event) => handleUserData(event)}
                                        value={userData.mobile}
                                    />
                                </div>
                                <div className='mb-2 md:flex md:justify-between'>
                                    <div className='mb-2 md:mr-2 md:mb-0'>
                                        <label
                                            className='block mb-2 text-sm font-bold text-gray-700'
                                            htmlFor='password'
                                        >
                                            Password
                                        </label>
                                        <input
                                            className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                            id='password'
                                            type='password'
                                            placeholder='******************'
                                            name='password'
                                            onChange={(event) => handleUserData(event)}
                                            value={userData.password}
                                        />
                                        <p className='text-xs italic text-red-500'>
                                            Please choose a password.
                                        </p>
                                    </div>
                                    <div className='md:ml-2'>
                                        <label
                                            className='block mb-2 text-sm font-bold text-gray-700'
                                            htmlFor='confirmPassword'
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                            id='confirmPassword'
                                            type='password'
                                            placeholder='******************'
                                            name='confirmPassword'
                                            onChange={(event) => handleUserData(event)}
                                            value={userData.confirmPassword}
                                        />
                                    </div>
                                </div>
                                <div className='mb-4 text-center'>
                                    <button
                                        className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                                        type='button'
                                        onClick={handleSubmit}
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className='mb-3 border-t' />
                                <div className='text-center'>
                                    <Link
                                        to='#'
                                        className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className='text-center'>
                                    <Link
                                        to='/login'
                                        className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                                    >
                                        Already have an account? Login!
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

export default RegisterPage;
