const mongoose = require('mongoose');

const Package = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        name: {
            type: String,
        },
        status: {
            type: String,
            enum: ['success', 'fail', 'shipping'],
            default: 'fail',
        },
        sendingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        deliveryAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Package', Package);
