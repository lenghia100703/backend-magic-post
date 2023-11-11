const Account = require('../models/Account');
const fs = require('fs');
const axios = require('axios');

const userController = {
    // [PUT] /user/:userId
    editUser: async (req, res) => {
        const imagePath = 'uploads/' + req.file.filename;
        const imageContent = fs.readFileSync(imagePath);
        const response = await axios.put(
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
        if (req.params.userId === req.user._id) {
            try {
                const updateData = {
                    ...(req.body.username && { username: req.body.username }),
                    ...(req.body.email && { email: req.body.email }),
                    ...(req.body.phone && { phone: req.body.phone }),
                    ...(req.body.address && { address: req.body.address }),
                    ...(req.file.filename
                        ? { avatar: response.data.content.download_url }
                        : { avatar: 'https://avatars.githubusercontent.com/u/100254753?v=4' }),
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
                res.status(500).json({ error: err });
                return;
            }
        } else {
            res.status(403).json('You are not allowed to update your account');
            return;
        }
    },
};

module.exports = userController;
