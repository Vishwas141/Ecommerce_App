const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser())
dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ' http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials:true
}));
app.use(express.json());


//userRoutes

const userRoute = require("./routes/userRoute");
app.use("/api/auth", userRoute);




/* The code `const databaseConnection = require("./connection/databaseConnection");` is importing a
module or file named `databaseConnection` from the `./connection` directory. */

const databaseConnection = require("./connection/databaseConnection");
databaseConnection();


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
