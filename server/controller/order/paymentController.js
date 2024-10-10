
const mongoose = require('mongoose');
const ccavenue = require('node-ccavenue');
const orderModel = require('../../models/orderProductModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const querystring = require('querystring');
const userModel = require('../../models/userModel');
const cron = require('node-cron');
const  transporter  = require('../../config/nodemailerConfig');
const addToCartModel = require('../../models/cartProduct'); 



// CC Avenue configuration
const ccavenueConfig = {
    working_key: process.env.CCAVENUE_WORKING_KEY || '504A14245FF1A4236D306000E8860A2B',
    access_code: process.env.CCAVENUE_ACCESS_CODE || 'ATIO05LI95BN18OINB',
};

// AES-128-CBC Encryption function
const encryptData = (data, workingKey) => {
    const queryString = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    const m = crypto.createHash('md5').update(workingKey);
    const key = m.digest();
    const iv = Buffer.from('\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f');
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encoded = cipher.update(queryString, 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
};

// Payment Initiation Controller
// Payment Initiation Controller
exports.paymentController = async (req, res) => {
    try {
        const { cartItems, customerInfo } = req.body;
        const shippingAddress = `${customerInfo.street}, ${customerInfo.city}, ${customerInfo.state}, ${customerInfo.postalCode}, ${customerInfo.country}`;
        const billingAddress = `${customerInfo.street}, ${customerInfo.city}, ${customerInfo.state}, ${customerInfo.postalCode}, ${customerInfo.country}`;

        console.log("Customer Info:", customerInfo);
       
        // Find the user making the request
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => {
            return total + item.quantity * item.productId.sellingPrice;
        }, 0);

        // Generate a unique order ID
        const orderId = `order_${Date.now()}`;

        // Prepare the order data to store in the database
        const newOrder = new orderModel({
            orderId,
            productDetails: cartItems.map((item) => ({
                productId: item.productId._id,
                productName: item.productId.productName,
                category: item.productId.category,
                quantity: item.quantity,
                price: item.productId.sellingPrice,
                productImage: item.productId.productImage[0],
            })),
            email: user.email,
            userId: req.userId,
            totalAmount,
            paymentDetails: {
                paymentId: "",
                payment_method_type: [],
                payment_status: "pending",
            },
            billing_name: user.name,
            billing_email: user.email,
            billing_tel: user.mobile,
            billing_address: customerInfo.billingAddress || billingAddress,
            shipping_address: customerInfo.shippingAddress || shippingAddress,
        });

        // Save the order
        const savedOrder = await newOrder.save();
        console.log('Order created:', savedOrder);

        // Prepare CCAvenue payment details
        const ccAvenueData = {
            merchant_id: process.env.CCAVENUE_MERCHANT_ID,
            order_id: orderId,
            currency: "INR",
            amount: totalAmount.toFixed(2),
            redirect_url: `http://localhost:8080/api/payment/redirect`,
            cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel`,
            billing_name: user.name,
            billing_email: user.email,
            billing_tel: user.mobile,
            billing_address: customerInfo.billingAddress || billingAddress,
            shipping_address: customerInfo.shippingAddress || shippingAddress,
        };

        // Encrypt the data using CCAvenue's working key
        const encRequest = encryptData(ccAvenueData, ccavenueConfig.working_key);

        // Send encrypted request data to frontend
        const responseText = `encRequest=${encRequest}&access_code=${ccavenueConfig.access_code}`;
        res.type('text/plain').send(responseText);

    } catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).json({
            message: error.message || "Internal Server Error",
            success: false,
        });
    }
};

// Verify Payment after redirect
// Verify Payment after redirect
exports.verifyPayment = async (req, res) => {
    try {
        const { order_id, tracking_id, payment_id, response_code } = req.body;

        if (!order_id || !response_code) {
            return res.status(400).send("Missing necessary payment data.");
        }

        // Process only if payment is successful
        if (response_code === 'Success') {
            const order = await orderModel.findOne({ orderId: order_id });
            if (!order) {
                return res.status(404).send("Order not found!");
            }

            // Update payment details and order status in DB
            order.paymentDetails.paymentId = payment_id;
            order.paymentDetails.payment_method_type = 'CCAvenue'; // or another method if applicable
            order.paymentDetails.payment_status = 'Success';
            order.order_status = 'Success';  // Update the main order status to 'Success'
            await order.save();

            return res.status(200).send("Payment successful!");
        } else {
            console.error(`Payment failed for order ID ${order_id}. Response Code: ${response_code}`);
            return res.status(400).send(`Payment failed! Order ID: ${order_id}. Response Code: ${response_code}`);
        }
    } catch (error) {
        console.error('Error during payment verification:', error);
        return res.status(500).send("Internal Server Error");
    }
};


// Decrypt response data
const decryptData = (encResp, workingKey) => {
    const m = crypto.createHash('md5').update(workingKey);
    const key = m.digest();
    const iv = Buffer.from('\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f');
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decoded = decipher.update(encResp, 'hex', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
};

// Handle Payment Redirect


exports.redirectPayment = async (req, res) => {
    const { encResp } = req.body; // Extract the encrypted response from request body
    const workingKey = process.env.CCAVENUE_WORKING_KEY; // Get working key from environment variables
    const ceoEmail = 'careelda@gmail.com'; // Replace with the actual CEO email address

    try {
        // Decrypt the response
        const ccavResponse = decryptData(encResp, workingKey);
        
        // Parse the decrypted response into key-value pairs
        const responseParams = querystring.parse(ccavResponse);
        
        // Log the decrypted response for debugging
        console.log('Payment Response:', responseParams);

        // Ensure that the order_id is valid (trim any extra spaces)
        const orderId = responseParams.order_id.trim(); 
        console.log(`Looking for order with ID: ${orderId}`);

        // Find the order by ID in the database
        const order = await orderModel.findOne({ orderId: orderId });
        
        // Log the order retrieval result
        if (!order) {
            console.log(`Order not found for order_id: ${orderId}`);
            return res.status(404).send("Order not found!");
        }

        // Proceed with payment status check only if order exists
        if (responseParams.order_status === 'Success') {
            // Update order details on successful payment
            order.paymentDetails = order.paymentDetails || {}; // Ensure paymentDetails exists
            order.paymentDetails.paymentId = responseParams.tracking_id;
            order.paymentDetails.payment_status = 'Success';
            order.order_status = 'Success';  // Main order status

            // Save the updated order
            await order.save();

            console.log(`Order ${orderId} updated successfully with status 'Success'`);

            // Delete products from the shopping cart
            await addToCartModel.deleteMany({ userId: order.userId }); // Use addToCartModel instead of cartModel
            console.log(`Cart cleared for user ID: ${order.userId}`);

            // Send order confirmation email to the customer
            const customerMailOptions = {
                from: process.env.EMAIL_USER, // sender address
                to: order.billing_email, // customer email
                subject: 'Order Confirmation', // Subject line
                text: `Thank you for your purchase!\n\nYour order ID: ${orderId}\nTracking ID: ${responseParams.tracking_id}\n\nWe appreciate your business!`, // plain text body
                html: `<p>Thank you for your purchase!</p>
                       <p>Your order ID: <strong>${orderId}</strong></p>
                       <p>Tracking ID: <strong>${responseParams.tracking_id}</strong></p>
                       <p>We appreciate your business!</p>`, // HTML body
            };

            // Send order received email to the CEO
            const ceoMailOptions = {
                from: process.env.EMAIL_USER, // sender address
                to: ceoEmail, // CEO email
                subject: 'Order Received', // Subject line for CEO
                text: `An order has been received!\n\nOrder ID: ${orderId}\nTracking ID: ${responseParams.tracking_id}`, // plain text body
                html: `<p>An order has been received!</p>
                       <p>Order ID: <strong>${orderId}</strong></p>
                       <p>Tracking ID: <strong>${responseParams.tracking_id}</strong></p>`, // HTML body
            };

            // Send emails
            transporter.sendMail(customerMailOptions, (error, info) => {
                if (error) {
                    return console.error('Error sending customer email:', error);
                }
                console.log('Customer email sent:', info.response);
            });

            transporter.sendMail(ceoMailOptions, (error, info) => {
                if (error) {
                    return console.error('Error sending CEO email:', error);
                }
                console.log('CEO email sent:', info.response);
            });

            // Redirect to the success page
            return res.redirect(`http://localhost:8080/success?order_id=${responseParams.order_id}&tracking_id=${responseParams.tracking_id}`);
        } else {
            // Handle failed payment case
            order.paymentDetails = order.paymentDetails || {}; // Ensure paymentDetails exists
            order.paymentDetails.payment_status = 'Failed'; 
            order.order_status = 'Failed';  // Update main order status

            // Save the updated order
            await order.save();

            console.log(`Order ${orderId} marked as 'Failed'`);

            // Redirect to the failure page
            return res.redirect(`http://localhost:8080/cancel?status=${responseParams.order_status}&order_id=${responseParams.order_id}`);
        }
    } catch (error) {
        // Catch and log any errors during the process
        console.error('Error during payment verification:', error);
        return res.status(500).json({ status: 'failed', message: 'Payment verification failed.' });
    }
};







// Cancel Payment Handler
exports.cancelPayment = async (req, res) => {

    const { encResp } = req.body; // Extract the encrypted response from request body
    const workingKey = process.env.CCAVENUE_WORKING_KEY;
    const { order_id } = req.body;

    const ccavResponse = decryptData(encResp, workingKey);
        
    // Parse the decrypted response into key-value pairs
    const responseParams = querystring.parse(ccavResponse);

    try {
        const order = await orderModel.findOne({ orderId: order_id });
        if (!order) {
            return res.redirect(`http://localhost:8080/cancel?status=${responseParams.order_status}&order_id=${responseParams.order_id}`);
        }

        // Update order status for payment cancellation
        order.paymentCompleted = false;
        await order.save();

        res.status(200).send(`Payment was canceled. Order ID: ${order_id}`);
    } catch (error) {
        console.error('Error handling payment cancellation:', error);
        res.status(500).send("Internal Server Error");
    }
};
