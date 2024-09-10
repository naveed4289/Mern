const express=require("express")
const router=express.Router();
const productController=require("../controllers/product-controller")
const authMiddleware=require("../middlewares/auth-middleware")



 router.route("/getProduct").get(authMiddleware,productController.getAllProduct);


module.exports=router;  