const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (request, response) => {
    try {
        const userId = request.userId;

        const user = await userModel.findById(userId);
        
        // Check if user exists and has the ADMIN role
        if (!user || user.role !== 'ADMIN') {
            return response.status(403).json({
                message: "Access denied",
                success: false,
            });
        }

        // Fetch all orders along with the user's details who made the purchase
        const allOrders = await orderModel.find()
            .populate('userId', 'email')  // Populate email from the user
            .sort({ createdAt: -1 });

        console.log(allOrders);

        return response.status(200).json({
            data: allOrders,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};

module.exports = allOrderController;
