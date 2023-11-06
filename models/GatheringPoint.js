const mongoose = require('mongoose');

const GatheringPoint = new mongoose.Schema(
    {
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        staffs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Account',
            },
        ],
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'TransactionPoint',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('GatheringPoint', GatheringPoint);
