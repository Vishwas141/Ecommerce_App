const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../config/Cloudinary");

exports.createProduct = async (req, res) => {
    try {
        // Extracting product details from the request body
       

        const { name, description, price, category, stock } = req.body;
     
        // console.log(req.files.file);
        
      const image = await uploadImageToCloudinary(req.files.file, "vishwas", 1000, 1000);
      
        // console.log(image);
        
        // Creating a new product instance using the Product model
        const newProduct = new Product({
            name,
            description,
            imageUrl:image.url,
            price,
            category,
            stock,
            // You can add more fields if needed
        });
   
        // Saving the new product to the database
        const savedProduct = await newProduct.save();

        return res.json({
            success: true,
            msg: 'Product created successfully',
            product: savedProduct,
        });
    } catch (err)
    {
        return res.status(500).json({
            success: false,
            msg: err.message,
        });
    }
};



exports.getProduct = async (req, res) => {
  try {
    // Retrieve data from the request body
    const { product, minValue, maxValue } = req.body;

    // Convert minValue and maxValue to integers
    const minPrice = parseInt(minValue, 10) || 0;
    const maxPrice = parseInt(maxValue, 10) || 50000;

    // console.log('Search Parameters:', { product, minPrice, maxPrice });

    const products = await Product.find();
    // console.log(typeof(product));
    
    if (product==='null' || product === null || product === undefined || product === '') {
       data = products.filter((item) => {
        // Make the category comparison case-insensitive
        return (
          
          item.price >= minPrice &&
          item.price <= maxPrice
        );
       });
  
      return res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      const data = products.filter((item) => {
        // Make the category comparison case-insensitive
        return (
          item.category.toLowerCase() === product.toLowerCase() &&
          item.price >= minPrice &&
          item.price <= maxPrice
        );
      });


      // console.log("not null",data);

    
      return res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (err) {
    console.error('Error in getProduct:', err);
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
};


exports.getsingleproduct = async (req, res) =>
{
    try
    {
        const { productId } = req.params;

      const product = await Product.findById({ _id: productId });
      return res.status(200).json({
        success: true,
        data:product
      });


    }
    catch (err)
    {
         console.error('Error in getProduct:', err);
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
    }
}




exports.editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, stock } = req.body;

    const image = await uploadImageToCloudinary(
      req.files.file,
      "vishwas",
      1000,
      1000
    );

    // Create a new product instance using the Product model
    const newProduct = new Product({
      name,
      description,
      imageUrl: image.url,
      price,
      category,
      stock,
      
    });

    // Update the existing product using findByIdAndUpdate
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: newProduct.name,
        description: newProduct.description,
        imageUrl: newProduct.imageUrl,
        price: newProduct.price,
        category: newProduct.category,
        stock: newProduct.stock,
        // Add more fields to update if needed
      },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};



exports.getAllProduct = async (req, res) =>
{
  try
  {
    const product = await Product.find();
    // console.log(product);
    return res.status(200).json({
      success: true,
      data:product
    })

  }
  catch (err)
  {
    return res.status(500).json({
      success: false,
      msg:err.message
    })
  }
}