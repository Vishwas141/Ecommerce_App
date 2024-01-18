import axios from 'axios';
import React, { useState } from 'react'
import { MdRemoveShoppingCart } from "react-icons/md";


const CartCard = ({ product }) => {
    const [productQuantity, setProductQuantity] = useState(product?.quantity);

    const handleIncrement = () => {
        setProductQuantity(productQuantity + 1);
        console.log(productQuantity);
    }
    const handledecrement = () => {
        if (productQuantity > 1) {
            setProductQuantity(productQuantity - 1);
        }
    }
    const handleChange = (e) => {
        let val = parseInt(e.target.value, 10); // specify the radix (base) as 10
        if (!isNaN(val)) {
            setProductQuantity(val);
        } else {
            console.log("Invalid integer");
        }

        
    }

    const removeFromCart = async() => {
    
        try
        {
            const data = await axios.post('http://localhost:5000/api/cart/remove', {
                productId: product.productId,
            }, { withCredentials: true });

            window.location.reload();

          
        }
        catch (err)
        {
            console.log(err);

        }

     }



    return (
        <div>
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start sm:flex">
                <img
                    src={product.imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40" />
                
                <div className='flex flex-col items-center justify-center gap-5'>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between flex  justify-center items-center gap-[100px]">
                        <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900">
                                {product?.name}
                            </h2>
                         
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => { handledecrement() }}>
                                    {" "}
                                    -{" "}
                                </span>
                                <input
                                    className="h-8 w-[60px] border bg-white text-center text-xs outline-none"
                                    type="number"
                                    value={productQuantity}
                                    min={1}
                                    onChange={(e) => { handleChange(e) }}
                                />
                                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => { handleIncrement() }}>
                                    {" "}
                                    +{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='mr-[80px]'>
                        {


                            product.stock > 0
                                ? (<div className="text-red-500">
                                    Only {product.stock} left in stock - Order soon
                                </div>)
                            : (<div className="text-red-500">Out of stock</div>)

                        }

                    </div>
                    <div className=' text-[20px] font-semibold sm:ml-[-130px] '>
                       <span className='text-black '>Product :</span> ${productQuantity*product.price}
                    </div>
                    <div className='flex  justify-center items-center gap-3 w-full '>

                       
                        <button className='w-full h-[30px] ml-10' onClick={()=>{removeFromCart()}}>
                            <MdRemoveShoppingCart size={30} />
                        </button>

                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5  font-medium text-blue-50 hover:bg-blue-600">
                            Check out
                        </button>

                    </div>
                </div>

            </div>



        </div>
    )
}

export default CartCard;