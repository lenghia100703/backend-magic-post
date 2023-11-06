const mongoose = require('mongoose');

const District = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        code: {
            type: String,
            unique: true,
            required: true,
        },
        provinceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('District', District);
