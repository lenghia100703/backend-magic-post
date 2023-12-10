const mongoose = require('mongoose');

const Package = new mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        name: {
            type: String,
        },
        weight: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['success', 'fail', 'shipping'],
            default: 'shipping',
        },
        transactionSendingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        gatheringSendingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        gatheringDeliveryAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        transactionDeliveryAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        shippingFee: {
            type: Number,
        },
        shippingMethod: {
            type: String,
            enum: ['fast', 'express'],
        },
        currentPoint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        nextPoint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Package', Package);
