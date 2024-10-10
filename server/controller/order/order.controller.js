// const orderModel = require("../../models/orderProductModel")

// const orderController = async(request,response)=>{
//     try {
//         const currentUserId = request.userId

//         const orderList = await orderModel.find({ userId : currentUserId }).sort({ createdAt : -1 })


//         response.json({
//             data : orderList,
//             message : "Order list",
//             success : true
//         })

//     } catch (error) {
//         response.status(500).json({
//             message : error.message || error,
//             error : true
//         })
//     }
// }

// module.exports = orderController

const orderModel = require("../../models/orderProductModel");

const orderController = async (request, response) => {
    try {
        const currentUserId = request.userId;

        // Check if userId is available
        if (!currentUserId) {
            return response.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // Fetch the order list for the current user
        const orderList = await orderModel.find({ userId: currentUserId }).sort({ createdAt: -1 });

        // Check if any orders were found
        if (orderList.length === 0) {
            return response.status(404).json({
                success: false,
                message: "No orders found for this user",
            });
        }

        return response.json({
            data: orderList,
            message: "Order list retrieved successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error fetching order list:", error);
        return response.status(500).json({
            success: false,
            message: error.message || "An error occurred while fetching orders",
            error: true,
        });
    }
};

module.exports = orderController;
