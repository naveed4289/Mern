const express= require ("express")
const router=express.Router();
const adminController=require("../controllers/admin-controller")
const adminMiddleware=require("../middlewares/admin-middleware")
const authMiddleware=require("../middlewares/auth-middleware")
const product=require("../controllers/product-controller")
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error("Error: Images Only!"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } 
});
//product add krny k method use multer and path 
router.route("/addProduct").post(authMiddleware,adminMiddleware, upload.single('image'), product.AddProduct);


//user k liya 
router.route("/user").get(authMiddleware,adminMiddleware,adminController.getAllUser)
router.route("/user/:id").get(authMiddleware,adminMiddleware,adminController.getSingleUser)
router.route('/users/update/:id').patch(authMiddleware,adminMiddleware,adminController.updateUserById);
router.route("/user/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteUserById)


//product add k liye hai
// router.route("/product").post(authMiddleware,adminMiddleware,product.AddProduct)

//product get k liye
router.route("/product/data").get(authMiddleware,adminMiddleware,product.getAllProduct)

//product delete 
router.route("/product/delete/:id").delete(authMiddleware, adminMiddleware, product.deleteProductById);


//product update get

router.route('/products/:id').get(authMiddleware, adminMiddleware, product.getProductById);

//product update by id
// router.route('/products/update/:id').patch(authMiddleware,adminMiddleware,product.UpdateProductById);

router.route('/products/update/:id')
    .patch(authMiddleware, adminMiddleware, upload.single('image'), product.UpdateProductById);

    router.route("/product/search").get(authMiddleware, product.searchProducts);

module.exports=router;