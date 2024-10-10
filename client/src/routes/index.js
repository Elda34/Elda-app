// import { createBrowserRouter } from 'react-router-dom'
// import App from '../App'
// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import ForgotPassowrd from '../pages/ForgotPassowrd'
// import SignUp from '../pages/SignUp'
// import AdminPanel from '../pages/AdminPanel'
// import AllUsers from '../pages/AllUsers'
// import AllProducts from '../pages/AllProducts'
// import CategoryProduct from '../pages/CategoryProduct'
// import ProductDetails from '../pages/ProductDetails'
// import Cart from '../pages/Cart'
// import SearchProduct from '../pages/SearchProduct'
// import ContactUsPage from '../pages/ContactUsPage'
// import ServiceRequest from '../pages/ServiceRequest'
// import CustomerSupport from '../pages/CustomerSupport'
// import ProductRegistration from '../pages/ProductRegistration'
// import AuthorizedDealer from '../pages/AuthorizedDealer'
// import AuthorizedServiceCenter from '../pages/AuthorizedServiceCenter'
// import Membership from '../pages/MemberShip'
// // import AdminApplication from '../pages/AdminApplications'
// import AdminApplications from '../pages/AdminApplications'
// import AdminDealer from '../pages/AdminDealer'
// import Success from '../pages/Success'
// import Cancel from '../pages/Cancel'
// import OrderPage from '../pages/OrderPage'
// import AllOrder from '../pages/AllOrder'
// import Allmsg from '../pages/AdminCutomerSupport'
// import Allcont from '../pages/AdminCont'
// import AllproReg from '../pages/AdminProReg'
// import PrivacyPolicy from '../pages/PrivacyPolicy'
// import TermsAndConditions from '../pages/TermsAndConditions'
// import RefundPolicy from '../pages/RefundPolicy'
// import ShippingPolicy from '../pages/ShippingPolicy'
// import ResetPassword from '../pages/ResetPassword'
// import CheckoutPage from '../pages/CheckoutPage'
// import ThankYou from '../pages/Confirmation'
// import CareerPage from '../pages/CareerPage'
// import AboutUs from '../pages/AboutUs'
// import BlogPage from '../pages/BlogPage'
// import BlogPost from '../pages/BlogPost'
// import UserProfile from '../components/UserProfile'
// import AdminMessagesPage from '../pages/AdminCareer'

// // import AdminProReg from '../pages/AdminProReg'



// const router = createBrowserRouter([
//     {
//         path : "/",
//         element : <App/>,
//         children : [
//             {
//                 path : "",
//                 element : <Home/>
//             },
//             {
//                 path : "login",
//                 element : <Login/>
//             },
//             {
//                 path : "forgot-password",
//                 element : <ForgotPassowrd/>
//             },
//             {
//                 path : "sign-up",
//                 element : <SignUp/>
//             },
//             {
//                 path : "product-category",
//                 element : <CategoryProduct/>
//             },
//             {
//                 path : "product/:id",
//                 element : <ProductDetails/>
//             },
//             {
//                 path : 'cart',
//                 element : <Cart/>
//             },
//             {
//                 path : "search",
//                 element : <SearchProduct/>
//             },
//             {
//                 path : "admin-panel",
//                 element : <AdminPanel/>,
//                 children : [
//                     {
//                         path : "all-users",
//                         element : <AllUsers/>
//                     },
//                     {
//                         path : "all-products",
//                         element : <AllProducts/>
//                     },
//                     {
//                         path : "AdminApplications",
//                         element : <AdminApplications/>
//                     },
//                     {
//                         path : "AdminDealer",
//                         element : <AdminDealer/>
//                     },
//                     {
//                         path : "all-orders",
//                         element : <AllOrder/>
//                     },
//                     {
//                         path : "all-msg",
//                         element : <Allmsg/>
//                     },
//                     {
//                         path : "all-cont",
//                         element : <Allcont/>
//                     },
//                     {
//                         path : "all-reg",
//                         element : <AllproReg/>

//                     },
//                     {
//                         path : "all-applications",
//                         element : <AdminMessagesPage/>
//                     }

//                 ]
//             },
//             // {
//             //     path : "create-checkout-session",
//             //     element : <Cart/>
//             // },
//             {
//                 path : 'success',
//                 element : <Success/>
//             },
//             {
//                 path : "cancel",
//                 element : <Cancel/>
//             },
//             {
//                 path : 'order',
//                 element : <OrderPage/>
//             },
//             {
//                 path :"blog-page",
//                 element: <BlogPage/>
//             },
//             {
//                 path :"blog-post/:id",
//                 element: <BlogPost/>
//             },
//             {
//                 path : "ContactUsPage",
//                 element: <ContactUsPage/>
//             },
//             {
//                 path : "ServiceRequest",
//                 element : <ServiceRequest/>
//             },
//             {
//                 path : "CustomerSupport",
//                 element : <CustomerSupport/>
//             },
//             {
//                 path : "ProductRegistration",
//                 element : <ProductRegistration/>
//             },
//             {
//                 path : "AuthorizedDealer",
//                 element : <AuthorizedDealer/>
//             },
//             {
//                 path : "AuthorizedServiceCenter",
//                 element : <AuthorizedServiceCenter/>
//             },
//             {
//                 path : "MemberShip",
//                 element : <Membership/>
//             },
//             {
//                 path : "PrivacyPolicy",
//                 element : <PrivacyPolicy/>
//             },
//             {
//                 path : "TermsAndConditions",
//                 element : <TermsAndConditions/>
//             },
//             {
//                 path : "RefundPolicy",
//                 element : <RefundPolicy/>
//             },
//             {
//                 path : "ShippingPolicy",
//                 element : <ShippingPolicy/>
//             },
//             {
//                 path : "reset-password/:token",
//                 element : <ResetPassword/>
//             },
//             {
//                 path : "checkout",
//                 element : <CheckoutPage/>
//             },
//             {
//                 path : "thankyou",
//                 element : <ThankYou/>
//             },
//             {
//                 path : "CareerPage",
//                 element : <CareerPage/>
//             },
//             {
//                 path : "AboutUs",
//                 element : <AboutUs/>
//             },
//             {
//                 path : "user-Profile",
//                 element : <UserProfile/>
//             }
          

         
//         ]
//     }
// ])


// export default router

import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
// import Blog from '../pages/BlogPage'
import ContactUsPage from '../pages/ContactUsPage'
import ServiceRequest from '../pages/ServiceRequest'
import CustomerSupport from '../pages/CustomerSupport'
import ProductRegistration from '../pages/ProductRegistration'
import AuthorizedDealer from '../pages/AuthorizedDealer'
import AuthorizedServiceCenter from '../pages/AuthorizedServiceCenter'
import Membership from '../pages/MemberShip'
// import AdminApplication from '../pages/AdminApplications'
import AdminApplications from '../pages/AdminApplications'
import AdminDealer from '../pages/AdminDealer'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import OrderPage from '../pages/OrderPage'
import AllOrder from '../pages/AllOrder'
import Allmsg from '../pages/AdminCutomerSupport'
import Allcont from '../pages/AdminCont'
import AllproReg from '../pages/AdminProReg'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import TermsAndConditions from '../pages/TermsAndConditions'
import RefundPolicy from '../pages/RefundPolicy'
import ShippingPolicy from '../pages/ShippingPolicy'
// import ResetPassword from '../pages/resetPassword'
import CheckoutPage from '../pages/CheckoutPage'
import CareerPage from '../pages/CareerPage'
import UserProfile from '../components/UserProfile'
import AboutUs from '../pages/AboutUs'

import BlogPage from '../pages/BlogPage'
import BlogPost from '../pages/BlogPost'
import AdminMessagesPage from '../pages/AdminCareer'

// import AdminProReg from '../pages/AdminProReg'



const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "AdminApplications",
                        element : <AdminApplications/>
                    },
                    {
                        path : "AdminDealer",
                        element : <AdminDealer/>
                    },
                    {
                        path : "all-orders",
                        element : <AllOrder/>
                    },
                    {
                        path : "all-msg",
                        element : <Allmsg/>
                    },
                    {
                        path : "all-cont",
                        element : <Allcont/>
                    },
                    {
                        path : "all-reg",
                        element : <AllproReg/>

                    },
                     {
                        path : "all-applications",
                        element : <AdminMessagesPage/>
                    }


                ]
            },
            // {
            //     path : "create-checkout-session",
            //     element : <Cart/>
            // },
            {
                path : 'success',
                element : <Success/>
            },
            {
                path : "cancel",
                element : <Cancel/>
            },
            {
                path : 'order',
                element : <OrderPage/>
            },
             {
                path :"blog-page",
                element: <BlogPage/>
            },
            {
                path :"blog-post/:id",
                element: <BlogPost/>
            },
            {
                path : "ContactUsPage",
                element: <ContactUsPage/>
            },
            {
                path : "ServiceRequest",
                element : <ServiceRequest/>
            },
            {
                path : "CustomerSupport",
                element : <CustomerSupport/>
            },
            {
                path : "ProductRegistration",
                element : <ProductRegistration/>
            },
            {
                path : "AuthorizedDealer",
                element : <AuthorizedDealer/>
            },
            {
                path : "AuthorizedServiceCenter",
                element : <AuthorizedServiceCenter/>
            },
            {
                path : "MemberShip",
                element : <Membership/>
            },
                 {
                path : "PrivacyPolicy",
                element : <PrivacyPolicy/>
            },
            {
                path : "TermsAndConditions",
                element : <TermsAndConditions/>
            },
            {
                path : "RefundPolicy",
                element : <RefundPolicy/>
            },
            {
                path : "ShippingPolicy",
                element : <ShippingPolicy/>
            },
            //     {
            //     path : "reset-password/:token",
            //     element : <ResetPassword/>
            // },
                {
                path : "checkout",
                element : <CheckoutPage/>
            },
             {
                path : "CareerPage",
                element : <CareerPage/>
            },
            {
                path : "AboutUs",
                element : <AboutUs/>
            },
                {
                path : "user-Profile",
                element : <UserProfile/>
            }
         
         
        ]
    }
])


export default router