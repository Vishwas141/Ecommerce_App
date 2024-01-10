const { createProduct, getProduct,getsingleproduct } = require("../controllers/productController");


const router = require("express").Router();

router.post('/createproduct', createProduct);
router.post("/getproduct", getProduct);
router.get("/getsingleproduct/:productId", getsingleproduct);




module.exports = router;
