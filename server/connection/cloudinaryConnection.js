const cloudinary = require("cloudinary").v2; //! Cloudinary is being required
require("dotenv").config();

exports.cloudinaryConnection = () => {
	try {
		cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
		console.log("Connection Succesful")
	} catch (error) {
		console.log(error);
	}
};