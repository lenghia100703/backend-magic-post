const Account = require('../models/Account');
const Package = require('../models/Package');

const customerController = {
    // [GET] user/customer/search-order?page=&phone=&code=
    getPackage: async (req, res) => {
        try {
            // console.log(req.query);
            if (req.query.phone && req.query.page && !req.query.code) {
                const limit = 2;
                const skip = (Number(req.query.page) - 1) * limit;
                const account = await Account.find({ phone: req.query.phone });
                const orders = await Package.find({ senderId: account[0]._id })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                const countOrders = await Package.find({ senderId: account[0]._id }).countDocuments();
                res.status(200).json({
                    data: orders,
                    message: 'get orders success',
                    total: countOrders,
                });
                return;
            } else if (!req.query.phone && !req.query.page && req.query.code) {
                const order = await Package.find({ code: req.query.code });

                res.status(200).json({
                    data: order,
                    message: 'get order success',
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
