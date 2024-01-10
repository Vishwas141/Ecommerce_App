import React from 'react'
import { FaSearch } from "react-icons/fa";

const NoProductFoundPage = () => {
  return (
      <div className=' w-full text-[35px]  font-bold text-black flex justify-center min-h-screen items-center gap-5'>
           <FaSearch size={30}/>
           No Product Found
    </div>
  )
}

export default NoProductFoundPage