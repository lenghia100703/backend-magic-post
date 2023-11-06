const mongoose = require('mongoose');

const TransactionPoint = new mongoose.Schema(
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
        gatheringId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GatheringPoint',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('TransactionPoint', TransactionPoint);
