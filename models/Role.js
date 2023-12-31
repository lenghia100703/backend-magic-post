const mongoose = require('mongoose');

const Role = new mongoose.Schema(
    {
        description: {
            type: String,
        },
        code: {
            type: String,
            unique: true,
            required: true,
        },
        accounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Account',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Role', Role);
