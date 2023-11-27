const Package = require('../models/Package');

const gatheringStaffController = {
    // [PUT] user/staff/gathering/confirm-package-from-transaction/:packageId
    confirmPackageFromTransaction: async (req, res) => {
        try {
            const package = await Package.findById(req.params.packageId);
            const confirmPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    nextPoint: package.gatheringDeliveryAddress,
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: confirmPackage,
                message: 'confirm package from transaction success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to confirm package from transaction point',
            });
            return;
        }
    },

    // [PUT] user/staff/gathering/confirm-package-from-gathering/:packageId
    confirmPackageFromGathering: async (req, res) => {
        try {
            const package = await Package.findById(req.params.packageId);
            const confirmPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    nextPoint: package.transactionDeliveryAddress,
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: confirmPackage,
                message: 'confirm package from gathering success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to confirm package from gathering point',
            });
            return;
        }
    },

    // [PUT] user/staff/gathering/send-package-to-transaction/:packageId
    sendPackageToTransaction: async (req, res) => {
        try {
            const package = await Package.findById(req.params.packageId);
            const sendPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    currentPoint: package.transactionDeliveryAddress,
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: sendPackage,
                message: 'send package to transaction success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to send package to transaction point',
            });
            return;
        }
    },

    // [PUT] user/staff/gathering/send-package-to-gathering/:packageId
    sendPackageToGathering: async (req, res) => {
        try {
            const package = await Package.findById(req.params.packageId);
            const sendPackage = await Package.findByIdAndUpdate(
                req.params.packageId,
                {
                    currentPoint: package.gatheringDeliveryAddress,
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: sendPackage,
                message: 'send package to gathering success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to send package to gathering point',
            });
            return;
        }
    },
};

module.exports = gatheringStaffController;
