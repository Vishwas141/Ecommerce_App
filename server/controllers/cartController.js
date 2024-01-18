const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Cart = require("../models/cartMode");


function isProductIdInArray(productId, array) {
    for (const item of array) {
        if (item.product.toString() === productId.toString()) {
            return true; // productId found in the array
        }
    }
    return false; // productId not found in the array
}



exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body; // Assuming you are sending productId and price from the frontend

        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({
                message: "Invalid token or user not logged in"
            });
        }


        const decodedToken = jwt.verify(token, 'Vishwas'); // Removed await since jwt.verify is synchronous unless a callback is provided

        const userId = decodedToken.id;



        const userCart = await Cart.find({ user: userId });

        if (userCart.length == 0) {
            const cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity: quantity, totalProductAmount: quantity * price }]
            });
            await cart.save();
            return res.status(201).json({
                success: true,
                // data: cart
            });
        }
        else {
            let canTheirExistProduct = false;

            for (const cartItem of userCart) {
                for (const productItem of cartItem.products) {
                    // Assuming productItem is an object with a 'product' property
                    if (productItem.product.toString() === productId.toString()) {
                        canTheirExistProduct = true; // productId found in the array
                    }
                }
            }
            if (!canTheirExistProduct) {

                const updateUserCart = await Cart.findOneAndUpdate({ user: userId }, { $push: { products: { product: productId, quantity: quantity, totalProductAmount: price * quantity } } }, { new: true });
                return res.status(201).json({
                    success: true,
                    // data: updateUserCart
                });
            }
            else {
                const updateUserCart = await Cart.findOneAndUpdate(
                    { user: userId, 'products.product': productId },
                    {
                        $set: {
                            'products.$.quantity': quantity, // Specify the updated quantity here
                            'products.$.totalProductAmount': quantity * price // Specify the updated totalProductAmount here
                        }
                    },
                    { new: true }
                );
                // console.log(updateUserCart);

                return res.status(200).json({
                    success: true,
                    // data: updateUserCart
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getCart = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({
                message: "Invalid token or user not logged in"
            });
        }

        const decodedToken = jwt.verify(token, 'Vishwas');
        const userId = decodedToken.id;

        const userCart = await Cart.findOne({ user: userId })
            .populate({
                path: 'products.product',
                model: 'Product'
            })
            .exec();

        if (!userCart) {
            return res.status(200).json({
                success: true,
                data: []
            });
        } else {
            const simplifiedProducts = userCart.products.map(product => ({

                productId: product.product._id,
                name: product.product.name,
                description: product.product.description,
                price: product.product.price,
                category: product.product.category,
                imageUrl: product.product.imageUrl,
                stock: product.product.stock,
                ratings: product.product.ratings,
                createdBy: product.product.createdBy,
                quantity: product.quantity,
                // totalProductAmount: product.totalProductAmount
            }));
            let totalAmount = 0;

            userCart.products.map((product) => {
                totalAmount += product.product.price; // Assuming product has a property named 'product' with a 'price' property
            });

            // console.log(totalAmount);

            return res.status(200).json({
                success: true,
                data: simplifiedProducts,
                totalAmount: totalAmount

            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log(productId);

        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({
                message: "Invalid token or user not logged in"
            });
        }
        console.log(token);

        const decodedToken = jwt.verify(token, 'Vishwas');
        const userId = decodedToken.id;

        const userCart = await Cart.findOneAndUpdate({ user: userId },
            { $pull: { products: { product: productId } } },
            { new: true }
        );


        console.log(userCart);

        return res.status(200).json({
            success: true,
            data: userCart
        });
    }
    catch (err) {
        return res.status(500).json({ message: "product not found" });

    }

}

