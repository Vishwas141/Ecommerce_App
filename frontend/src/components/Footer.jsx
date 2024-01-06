import React from 'react'
import shoplogo from "../assets/shoplogo.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <div>
          <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
              <div className="mx-auto max-w-screen-xl text-center">
                  <a
                      href="#"
                      className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                     <img src={shoplogo} className='w-[60px] h-[60px]'/>
                      
                  </a>
                  <p className="my-6 text-gray-500 dark:text-gray-400">
                      At Ecommerce, we're not just selling products; we're crafting experiences. Embrace the seamless fusion of fashion, function
                  </p>
                  <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                      <li>
                          <Link to="/" className="mr-4 hover:underline md:mr-6 ">
                              Home
                          </Link>
                      </li>
                      
                      
                      <li>
                          <Link to="/" className="mr-4 hover:underline md:mr-6">
                              Contact Us
                          </Link>
                      </li>
                      <li>
                          <Link to="/" className="mr-4 hover:underline md:mr-6">
                              Products
                          </Link>
                      </li>
                      <li>
                          <Link to="/" className="mr-4 hover:underline md:mr-6">
                              FAQs
                          </Link>
                      </li>
                      
                  </ul>
                  <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                      © 2023-2024{" "}
                      <Link to="/" className="hover:underline">
                          Ecommerce™
                      </Link>
                      . All Rights Reserved.
                  </span>
              </div>
          </footer>

    </div>
  )
}

export default Footer