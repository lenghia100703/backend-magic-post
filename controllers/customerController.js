const Package = require('../models/Package');

const customerController = {
    // [GET] user/customer/search-order?page=
    getOrder: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;

                const orders = await Package.find({ senderId: req.user._id })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });
                const countOrders = Package.countDocuments();

                res.status(200).json({
                    data: orders,
                    message: 'get orders success',
                    total: countOrders,
                });
                return;
            }
        } catch (error) {
            res.status(404).json({
                error: error,
                message: 'not found',
            });
            return;
        }
    },
};

module.exports = customerController;
