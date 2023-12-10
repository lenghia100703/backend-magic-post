const Package = require('../models/Package');
<<<<<<< HEAD
const Account = require('../models/Account');
=======
const GatheringPoint = require('../models/GatheringPoint');
>>>>>>> ad556652712f6cff2ecf0b16a6f92cc911f388ba

const packageController = {
    // [GET] package/staff/transaction/shipping?page
    getPackageShipping: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const totalData = await Package.find({ nextPoint: null, status: 'shipping' }).countDocuments();

                const packageShipping = await Package.find({ nextPoint: null, status: 'shipping' })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageShipping,
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

    // [GET] package/staff/transaction/delivery?page
    getPackageDelivery: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const account = await Account.findById(req.user._id);
                const totalData = await Package.find({
                    transactionDeliveryAddress: account.workPlace,
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $eq: ['$currentPoint', '$transactionDeliveryAddress'] },
                        ],
                    },
                }).countDocuments();

                const packageSend = await Package.find({
                    transactionDeliveryAddress: account.workPlace,
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $eq: ['$currentPoint', '$transactionDeliveryAddress'] },
                        ],
                    },
                })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageSend,
                    message: 'get package delivery success',
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

    // [GET] package/staff/gathering/delivery?page
    getPackageToGathering: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const account = await Account.findById(req.user._id);
                const totalData = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace, currentPoint: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace, currentPoint: account.workPlace },
                    ],
                    $expr: { $eq: ['$currentPoint', '$nextPoint'] },
                }).countDocuments();

                const packageSend = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace, currentPoint: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace, currentPoint: account.workPlace },
                    ],
                    $expr: { $eq: ['$currentPoint', '$nextPoint'] },
                })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageSend,
                    message: 'get package to gathering by gathering staff success',
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

    // [GET] package/staff/gathering/send?page
    getPackageFromGathering: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const account = await Account.findById(req.user._id);
                const totalData = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace, currentPoint: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace, currentPoint: account.workPlace },
                    ],
                    $expr: { $ne: ['$currentPoint', '$nextPoint'] },
                }).countDocuments();

                const packageSend = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace, currentPoint: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace, currentPoint: account.workPlace },
                    ],
                    $expr: { $ne: ['$currentPoint', '$nextPoint'] },
                })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageSend,
                    message: 'get package to send by gathering staff success',
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

    // transaction manager role
    // [GET] package/manager/transaction/from?page
    getPackageFromGatheringInTransactionPoint: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const account = await Account.findById(req.user._id);
                const totalData = await Package.find({
                    transactionDeliveryAddress: account.workPlace,
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $ne: ['$currentPoint', '$gatheringSendingAddress'] },
                            { $ne: ['$currentPoint', '$gatheringDeliveryAddress'] },
                        ],
                    },
                }).countDocuments();

                const packageFromGathering = await Package.find({
                    transactionDeliveryAddress: account.workPlace,
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $ne: ['$currentPoint', '$gatheringSendingAddress'] },
                            { $ne: ['$currentPoint', '$gatheringDeliveryAddress'] },
                        ],
                    },
                })
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
    getPackageToGatheringInTransactionPoint: async (req, res) => {
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
                const account = await Account.findById(req.user._id);
                const totalData = await Package.find({
                    transactionSendingAddress: account.workPlace,
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $eq: ['$currentPoint', '$gatheringSendingAddress'] },
                        ],
                    },
                }).countDocuments();

                const packageFromGathering = await Package.find({
                    transactionSendingAddress: account.workPlace,
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $eq: ['$currentPoint', '$gatheringSendingAddress'] },
                        ],
                    },
                })
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
<<<<<<< HEAD

    // gathering manager role
    // [GET] package/manager/gathering/to?page
    getPackageToGatheringInGatheringPoint: async (req, res) => {
=======
    // [GET] package/manager/gathering/to?page
    getPackageToTransactionInGatheringPoint: async (req, res) => {
>>>>>>> ad556652712f6cff2ecf0b16a6f92cc911f388ba
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
<<<<<<< HEAD
                const account = await Account.findById(req.user._id);
                const totalData = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace, currentPoint: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace, currentPoint: account.workPlace },
                    ],
                    $expr: { $ne: ['$currentPoint', '$nextPoint'] },
                }).countDocuments();

                const packageToGathering = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace, currentPoint: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace, currentPoint: account.workPlace },
                    ],
                    $expr: { $ne: ['$currentPoint', '$nextPoint'] },
=======

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
>>>>>>> ad556652712f6cff2ecf0b16a6f92cc911f388ba
                })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
<<<<<<< HEAD
                    data: packageToGathering,
                    message: 'get package to gathering in gathering point success',
=======
                    data: packageFromGathering,
                    message: 'get package from transaction to sending gathering point/ from sending gathering point to delivery gathering point successfully',
>>>>>>> ad556652712f6cff2ecf0b16a6f92cc911f388ba
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
<<<<<<< HEAD
    getPackageFromGatheringInGatheringPoint: async (req, res) => {
=======
    getPackageFromGatheringInTransactionPoint: async (req, res) => {
>>>>>>> ad556652712f6cff2ecf0b16a6f92cc911f388ba
        try {
            if (req.query.page) {
                const limit = 10;
                const skip = (req.query.page - 1) * limit;
<<<<<<< HEAD
                const account = await Account.findById(req.user._id);
                const totalData = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace },
                    ],
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $ne: ['$currentPoint', '$gatheringSendingAddress'] },
                        ],
                    },
                }).countDocuments();

                const packageToGathering = await Package.find({
                    $or: [
                        { gatheringSendingAddress: account.workPlace },
                        { gatheringDeliveryAddress: account.workPlace },
                    ],
                    $expr: {
                        $and: [
                            { $eq: ['$currentPoint', '$nextPoint'] },
                            { $ne: ['$currentPoint', '$gatheringSendingAddress'] },
                        ],
                    },
                })
                    .limit(limit)
                    .skip(skip)
                    .sort({ updatedAt: -1 });

                res.status(200).json({
                    data: packageToGathering,
                    message: 'get package from gathering in gathering point success',
=======
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
>>>>>>> ad556652712f6cff2ecf0b16a6f92cc911f388ba
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
<<<<<<< HEAD
=======
    
>>>>>>> ad556652712f6cff2ecf0b16a6f92cc911f388ba
};

module.exports = packageController;
