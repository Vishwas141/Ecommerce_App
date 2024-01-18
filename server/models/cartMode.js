const mongoose = require('mongoose'); // This should be at the top
const jwt = require("jsonwebtoken");


// Define the cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Ensure a cart is always linked to a user
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      totalProductAmount: {
        type: Number,
        default: 0
      }
    },
  ]
});

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

// Export the Cart model
module.exports = Cart;