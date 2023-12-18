const TransactionPoint = require('../models/TransactionPoint');

const transactionPointController = {
    // [GET] /point/transaction/:location
    getTransactionPointByLocation: async (req, res) => {
        try {
            const transactionPoint = await TransactionPoint.findOne({ location: req.params.location });
            res.status(200).json({
                data: transactionPoint,
                message: 'get transaction point by location success',
            });
            return;
        } catch (err) {
            res.status(404).json({
                error: err,
                message: 'not found',
            });
            return;
        }
    },
};

module.exports = transactionPointController;
