const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
        type: String,
        required: true,
  },
  lastName: {
      type: String,
      required:true
    
  },
  profilePhoto: {
    type: String,
    default: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.1457610252.1704191878&semt=ais'
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        // Simple email format validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format'
    }
  },
  mobile: {
      type: String,
      required:true

  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (value) {
        // Password length validation
        return value.length >= 6;
      },
      message: 'Password must be at least 6 characters long'
    }
  }
});



// Hash the password before saving
// userSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


const User = mongoose.model('User', userSchema);

module.exports = User;
