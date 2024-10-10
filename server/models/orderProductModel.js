const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true }, // Add orderId field
    productDetails: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            productName : String,
            category : String,
            quantity: Number,
            price: Number,
            productImage: String, // Store image of product
        }
    ],
    email: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalAmount: Number,
    paymentDetails: {
        paymentId: String,
        payment_method_type: [String],
        payment_status: String,
    },
    billing_name: { type: String },
    billing_email: { type: String },
    billing_tel: { type: String },      
    billing_address: { type: String },
    shipping_address: { type: String },
    order_status: { type: String, default: 'Pending' }, // Track order status
    delivered_at: Date, // Record delivery date
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
