const mongoose = require('mongoose');

const Account = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            default: '6546fc4b4941402447950717',
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
        phone: { type: String, unique: true, required: true },
        refreshToken: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: 'https://s.net.vn/70GD',
        },
        workPlace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Account', Account);
