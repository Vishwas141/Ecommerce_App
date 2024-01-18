import React, { useEffect } from 'react';
import { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { createProductLink, editsingleProductLink, getSingleProductLink } from '../../api_calls/productApi';

const EditProduct = () =>
{
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        file: null, // New field for file upload
    });


    

    const { productId } = useParams();




    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('stock', formData.stock);
            formDataToSend.append('file', formData.file);

            const response = await axios.post(createProductLink, formDataToSend);

            // Handle the response as needed (e.g., show success message, redirect, etc.)
            console.log('Product created successfully:', response.data);
        } catch (error) {
            // Handle errors (e.g., show error message, log the error, etc.)
            console.error('Error creating product:', error.message);
        }
    };
    useEffect(() => {
        const getProductDetail = async() =>
        {
            try
            {
                const product = await axios.get(`${editsingleProductLink}/${productId}`); 
                const data = {
                    name: product.data.data.name,
                    description: product.data.data.description,
                    price: product.data.data.price,
                    category: product.data.data.category,
                    stock: product.data.data.stock,
                    file: null
                };
                
                setFormData(data);
            }
            catch (err)
            {
                location.reload();
            }
        }
        getProductDetail();
    }, [productId]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
            <div className="w-full w-10/12 bg-white rounded-md shadow-md p-6 flex justify-center flex-col ">
                <h2 className="font-bold text-4xl mb-6 text-center py-2">Edit Product</h2>
                <form>
                    <label className="block mb-4">
                        <span className="text-gray-700 font-semibold text-[18px]">Name:</span>
                        <input
                            className="form-input mt-1 block w-9/12 border border-black rounded-md py-2 px-3"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700  font-semibold text-[18px]">Description:</span>
                        <textarea
                            className="form-input mt-1 block w-9/12 border border-black rounded-md py-2 px-3"
                            value={formData.description}
                            onChange={handleChange}
                            
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700  font-semibold text-[18px]">Price:</span>
                        <input
                            className="form-input mt-1 block w-9/12 border border-black rounded-md py-2 px-3"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700  font-semibold text-[18px]">Category:</span>
                        <input
                            className="form-input mt-1 block w-9/12 border border-black rounded-md py-2 px-3"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700  font-semibold text-[18px]">Stock:</span>
                        <input
                            className="form-input mt-1 block w-9/12 border border-black rounded-md py-2 px-3"
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-4 ">
                        <span className="text-gray-700  font-semibold text-[18px]">Product Pic:</span>
                        <div className="flex items-center mt-4">
                            <input
                                className="hidden"
                                type="file"
                                name="file"
                                id="file"
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="file"
                                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            >
                                <BsUpload className="inline-block mr-2" />
                                Upload Image
                            </label>
                            {formData.file && (
                                <span className="text-gray-500">
                                    {formData.file.name} selected
                                </span>
                            )}
                        </div>
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500  mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        onClick={handleSubmit}
                    >
                         Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
