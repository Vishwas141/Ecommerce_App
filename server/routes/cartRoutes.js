

const router = require("express").Router();
const { addToCart ,getCart,removeFromCart} = require("../controllers/cartController");


router.post("/add", addToCart);
router.get("/getcart", getCart);
router.post("/remove", removeFromCart);



module.exports = router;

