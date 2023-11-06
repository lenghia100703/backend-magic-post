const mongoose = require('mongoose');

const Province = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        code: {
            type: String,
            unique: true,
            required: true,
        },
        districts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'District',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Province', Province);
