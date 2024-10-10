// import ProductRegistration from "../pages/ProductRegistration"

// import { upload } from "../../../backend/controller/applicationController"

const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    }, 
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    updateUserDetails : {
        url : `${backendDomin}/api/user/:userId`,
        method : "put"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    contactUs : {
        url : `${backendDomin}/api/submit`,
        method : 'post'
    },
    payment : {
        url : `${backendDomin}/api/checkout`,
        method : 'post'
    },
    verpay : {
        url : `${backendDomin}/api/ver-pay`,
        method : 'post'
    },
    authourisedServiceCentre : {
        url : `${backendDomin}/api/submit-application`,
        method : 'post'
    },
    getAllApplications : {
        url : `${backendDomin}/api/applications`,
        method : 'get'
    },
    ProductRegistration : {
        url:  `${backendDomin}/api/register`,
        method : 'post'
    },
    GetRegistrations:{
        url : `${backendDomin}/api/getreg`,
        method : 'get'
    },
    authorisedDealer : {
        url: `${backendDomin}/api/submit-app`,
        method: `post`
    },
    getDealer : {
        url: `${backendDomin}/api/dealer`,
        method: 'get'
    },
    upload : {
        url: `${backendDomin}/uploads`
    },
    getOrder : {
        url : `${backendDomin}/api/order-list`,
        method : 'get'
    },
    allOrder : {
        url : `${backendDomin}/api/all-order`,
           method : 'get'
    },
    allmsg : {
        url : `${backendDomin}/api/get-msg`,
        method : 'get'
    },
    customerSupport : {
        url : `${backendDomin}/api/sub-cont`,
        method : 'post'
    },
    allcont :{
        url : `${backendDomin}/api/getmsg`,
        method : 'get'
    },

    career : {
        url : `${backendDomin}/api/career/apply`,
        method : 'post'
    },
    allCareer : {
        url : `${backendDomin}/api/career/allapplies`
    }
}


export default SummaryApi
