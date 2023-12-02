const Account = require('../models/Account');
const fs = require('fs');
const axios = require('axios');

const userController = {
    // [PUT] /user/:userId
    editUser: async (req, res) => {
        if (req.file && req.file.filename) {
            const imagePath = 'uploads/' + req.file.filename;
            const imageContent = fs.readFileSync(imagePath);
            var response = await axios.put(
                `${process.env.REPO_URL}/${req.file.filename}`,
                {
                    message: 'Upload image',
                    content: Buffer.from(imageContent).toString('base64'),
                },
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: `Bearer ${process.env.ACCESS_TOKEN_GITHUB}`,
                    },
                },
            );
            fs.unlinkSync(imagePath);
        }
        if (req.params.userId === req.user._id) {
            try {
                const updateData = {
                    ...(req.body.username && { username: req.body.username }),
                    ...(req.body.email && { email: req.body.email }),
                    ...(req.body.phone && { phone: req.body.phone }),
                    ...(req.body.address && { address: req.body.address }),
                    ...(req.file.filename && { avatar: response.data.content.download_url }),
                };

                const editUser = await Account.findByIdAndUpdate(
                    req.params.userId,
                    {
                        $set: updateData,
                    },
                    {
                        new: true,
                    },
                );

                res.status(200).json(editUser);
                return;
            } catch (err) {
                res.status(500).json({ error: err, message: 'fail to update account' });
                return;
            }
        } else {
            res.status(403).json('You are not allowed to update your account');
            return;
        }
    },

    // [GET] /user/phone/:phoneNumber
    getUserByPhoneNumber: async (req, res) => {
        try {
            const account = await Account.findOne({ phone: req.params.phoneNumber });

            res.status(200).json({
                data: account,
                message: 'get user by phone number success',
            });
            return;
        } catch (err) {
            res.status(500).json({ error: err, message: 'fail to get user by phone number' });
            return;
        }
    },
};

module.exports = userController;
