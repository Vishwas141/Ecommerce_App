const { createProduct, getProduct,getsingleproduct,editProduct, getAllProduct } = require("../controllers/productController");


const router = require("express").Router();

router.post('/createproduct', createProduct);
router.post("/getproduct", getProduct);
router.get("/getsingleproduct/:productId", getsingleproduct);
router.get("/edit/:productId", getsingleproduct);
router.post("/editproduct/:productId",editProduct);
router.get("/all",getAllProduct);





module.exports = router;
