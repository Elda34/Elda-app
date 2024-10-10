const express = require('express')
const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const { forgetPassword, resetPassword } = require('../controller/user/forgetPassword')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const {paymentController, verifyPayment, redirectPayment, cancelPayment } = require('../controller/order/paymentController')
const { sendCustomerSupportMessage, getAllMessages } = require('../controller/user/contactController');
const { upload, handleFormSubmission, getAllApplications, getApplicationFile } = require('../controller/applicationController');
const { registerProduct, getAllRegistrations, getRegFile } = require('../controller/product/registrationController');
const { submitApplication, getAlldealer, getDealerFile } = require('../controller/dealerController');
const orderController = require('../controller/order/order.controller')
const allOrderController = require('../controller/order/allOrder.controller')
const {sendContactusMessage, getusAllMessages} = require('../controller/user/contactusController')
const { updateUserController, getUserController } = require('../controller/user/updateUserProfile');
const  { applyForJob, allCareers, getCareerFile }  = require('../controller/user/CareerController');

// Route for career form submission
router.post('/career/apply', upload.single('resume'), applyForJob);
router.get('/career/allapplies', allCareers)
router.get('/career/file/:id', getCareerFile)

router.put('/user/:userId', updateUserController);
router.get('/user/:userId', getUserController);

// router.post('/signup', profilePicUpload.single('profilePic'), userSignUpController);
router.post('/signup',userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.post('/forget-password', forgetPassword)
router.post('/reset-password/:token',  resetPassword)
//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.post('/register', upload.single('fileUpload'), registerProduct);
router.get('/getreg', getAllRegistrations)
router.get('/getreg/file/:id', getRegFile);

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

router.post('/submit', sendContactusMessage);
router.get('/get-msg', getAllMessages);
router.post('/sub-cont', sendCustomerSupportMessage)
router.get('/getmsg', getusAllMessages)
router.post('/submit-application', upload.single('fileUpload'), handleFormSubmission);
router.get('/applications', getAllApplications);
router.get('/application/file/:id', getApplicationFile);
router.post('/submit-app', upload.single('fileUpload'), submitApplication);
router.get('/dealer', getAlldealer);
router.get('/dealer/file/:id', getDealerFile);

//payment and order
router.post("/checkout", authToken, paymentController);
router.post('/payment/redirect', redirectPayment);
router.post('/payment/cancel', cancelPayment);

router.post("/verify-payment", authToken,verifyPayment);
router.get("/order-list",authToken,orderController)
router.get("/all-order",authToken,allOrderController)

module.exports = router;
