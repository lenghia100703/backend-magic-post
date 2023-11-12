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
            default: 'https://avatars.githubusercontent.com/u/100254753?v=4',
        },
        workPlace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Account', Account);
