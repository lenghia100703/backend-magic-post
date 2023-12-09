const Package = require('../models/Package');
const GatheringPoint = require('../models/GatheringPoint');

const packageController = {
    // [GET] package/staff/transaction/success?page
    getPackageSuccess: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const totalData = await Package.find({ status: 'success' }).countDocuments();

                const packageSuccess = await Package.find({ status: 'success' })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageSuccess,
                    message: 'get package success',
                    total: totalData,
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

    // [GET] package/staff/transaction/fail?page
    getPackageFail: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const totalData = await Package.find({ status: 'fail' }).countDocuments();

                const packageFail = await Package.find({ status: 'fail' })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageFail,
                    message: 'get package success',
                    total: totalData,
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

    // [GET] package/staff/transaction/send?page
    getPackageToSend: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const totalData = await Package.find({ creatorId: req.user._id }).countDocuments();

                const packageSend = await Package.find({ creatorId: req.user._id })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageSend,
                    message: 'get package to send success',
                    total: totalData,
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

    // [GET] package/manager/transaction/from?page
    getPackageFromGatheringInTransactionPoint: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const totalData = await Package.find({
                    transactionDeliveryAddress: req.user.workPlace,
                }).countDocuments();

                const packageFromGathering = await Package.find({ transactionDeliveryAddress: req.user.workPlace })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageFromGathering,
                    message: 'get package from gathering in transaction point success',
                    total: totalData,
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

    // [GET] package/manager/transaction/to?page
    getPackageFromGatheringInTransactionPoint: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const totalData = await Package.find({
                    transactionSendingAddress: req.user.workPlace,
                }).countDocuments();

                const packageFromGathering = await Package.find({ transactionSendingAddress: req.user.workPlace })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageFromGathering,
                    message: 'get package to gathering in transaction point success',
                    total: totalData,
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
    // [GET] package/manager/gathering/to?page
    getPackageToTransactionInGatheringPoint: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;

                const totalData = await Package.find({
                    $or: [
                        {gatheringSendingAddress: req.user.workPlace},
                        {gatheringDeliveryAddress: req.user.workPlace}
                    ],
                }).countDocuments();

                const packageFromGathering = await Package.find({ 
                    $or: [
                        {gatheringSendingAddress: req.user.workPlace},
                        {gatheringDeliveryAddress: req.user.workPlace}
                    ],
                })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageFromGathering,
                    message: 'get package from transaction to sending gathering point/ from sending gathering point to delivery gathering point successfully',
                    total: totalData,
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

    // [GET] package/manager/gathering/from?page
    getPackageFromGatheringInTransactionPoint: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const totalData = await Package.find({
                    $or: [
                        {
                            gatheringSendingAddress: req.user.workPlace,
                            passedSendingGathering: true,
                        },
                        {
                            gatheringDeliveryAddress: req.user.workPlace,
                            passedDeliveryGathering: true,
                        }
                    ],
                }).countDocuments();

                const packageFromGathering = await Package.find({
                    $or: [
                        {
                            gatheringSendingAddress: req.user.workPlace,
                            passedSendingGathering: true,
                        },
                        {
                            gatheringDeliveryAddress: req.user.workPlace,
                            passedDeliveryGathering: true,
                        }
                    ],
                })
                .limit(limit)
                .skip(skip)
                .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageFromGathering,
                    message: 'get package from gathering to other point successfully',
                    total: totalData,
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

module.exports = packageController;
