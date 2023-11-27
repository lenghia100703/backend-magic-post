const Package = require('../models/Package');
const Account = require('../models/Account');
const generateCode = require('../utils/generateCode');

const transactionStaffController = {
    // user/staff/transaction/create-package-to-receiver
    createPackageToReceiver: async (req, res) => {
        try {
            const packageCode = generateCode();
            const newPackage = new Package({
                senderId: req.body.senderId,
                receiverId: req.body.receiverId,
                name: req.body.name,
                weight: req.body.weight,
                sendingAddress: req.body.sendingAddress,
                deliveryAddress: req.body.deliveryAddress,
                shippingFee: req.body.shippingFee,
                shippingMethod: req.body.shippingMethod,
                code: packageCode,
            });

            const package = await newPackage.save();

            res.status(200).json({
                data: package,
                message: 'create package to receiver success',
            });
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to create package to receiver',
            });
            return;
        }
    },
};

module.exports = transactionStaffController;
