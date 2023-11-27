const Package = require('../models/Package');
const District = require('../models/District');
const generateCode = require('../utils/generateCode');

const transactionStaffController = {
    //[POST] user/staff/transaction/create-package-to-receiver
    createPackageToReceiver: async (req, res) => {
        try {
            const packageCode = generateCode();
            const transactionSendingPoint = await District.findOne({ _id: req.body.transactionSendingAddress });
            const transactionDeliveryPoint = await District.findOne({ _id: req.body.transactionDeliveryAddress });

            const gatheringSendingAddress = transactionSendingPoint.gatheringId;
            const gatheringDeliveryAddress = transactionDeliveryPoint.gatheringId;
            const newPackage = new Package({
                senderId: req.body.senderId,
                receiverId: req.body.receiverId,
                name: req.body.name,
                weight: req.body.weight,
                transactionSendingAddress: req.body.transactionSendingAddress,
                gatheringSendingAddress: gatheringSendingAddress,
                gatheringDeliveryAddress: gatheringDeliveryAddress,
                transactionDeliveryAddress: req.body.transactionDeliveryAddress,
                shippingFee: req.body.shippingFee,
                shippingMethod: req.body.shippingMethod,
                code: packageCode,
                currentPoint: req.body.transactionSendingAddress,
                nextPoint: gatheringSendingAddress,
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

    //[PUT] user/staff/transaction/confirm-package-from-gathering/:packageId
    confirmPackageFromGathering: async (req, res) => {
        try {
            const confirmPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    nextPoint: '',
                },
                {
                    new: true,
                },
            );
            res.status(200).json({
                data: confirmPackage,
                message: 'confirm package from gathering point success',
            });
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to confirm package from gathering point',
            });
            return;
        }
    },

    // [PUT] user/staff/transaction/send-package-to-gathering/:packageId
    sendPackageToGathering: async (req, res) => {
        try {
            const package = await Package.findById(req.params.packageId);
            const sendPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    currentPoint: package.gatheringSendingAddress,
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: sendPackage,
                message: 'send package to gathering point success',
            });
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to send package to gathering point',
            });
            return;
        }
    },

    // [PUT] user/staff/transaction/confirm-to-receiver-success/:packageId
    confirmToReceiverSuccess: async (req, res) => {
        try {
            const confirmPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    status: 'success',
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: confirmPackage,
                message: 'confirm package to receiver success',
            });
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to confirm package to receiver',
            });
            return;
        }
    },

    // [PUT] user/staff/transaction/confirm-to-receiver-fail/:packageId
    confirmToReceiverFail: async (req, res) => {
        try {
            const confirmPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    status: 'fail',
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: confirmPackage,
                message: 'confirm package to receiver success',
            });
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to confirm package to receiver',
            });
            return;
        }
    },
};

module.exports = transactionStaffController;
