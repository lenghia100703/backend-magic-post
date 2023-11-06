const Account = require('../models/Account');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    // [POST] /auth/register
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newAccount = new Account({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
            });

            const account = await newAccount.save();
            await Role.findByIdAndUpdate('6546fc4b4941402447950717', {
                $push: {
                    accounts: account._id,
                },
            });
            res.status(200).json({
                data: account,
                message: 'sign up success',
            });
            return;
        } catch (err) {
            res.status(500).json({
                message: 'fail to sign up',
                error: err,
            });
            return;
        }
    },

    // [POST] /auth/login
    login: async (req, res) => {
        try {
            const user = await Account.findOne({ email: req.body.email });
            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if (!user) {
                return res.status(404).json({
                    message: 'invalid account',
                });
            }

            if (!validPassword) {
                return res.status(404).json({
                    message: 'password incorrect',
                });
            }

            if (user && validPassword) {
                const accessToken = jwt.sign(
                    {
                        _id: user._id,
                        role: user.role,
                    },
                    process.env.SIGN_KEY,
                    {
                        expiresIn: '1d',
                    },
                );

                const refreshToken = jwt.sign(
                    {
                        _id: user._id,
                        role: user.role,
                    },
                    process.env.SIGN_KEY,
                    {
                        expiresIn: '1d',
                    },
                );

                await Account.findByIdAndUpdate(
                    user._id,
                    {
                        refreshToken: refreshToken,
                    },
                    {
                        new: true,
                    },
                );

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                });

                const { password, ...other } = user._doc;
                res.status(200).json({
                    data: { ...other, accessToken },
                    message: 'login success',
                });
            }
        } catch (err) {
            res.status(500).json({
                message: 'fail to sign in',
                error: err,
            });
            return;
        }
    },

    // [POST] /auth/logout
    logout: async (req, res) => {
        try {
            const cookie = req.cookies;
            res.clearCookie('refreshToken', {
                httpOnly: true,
            });

            await Account.findOneAndUpdate(
                {
                    refreshToken: cookie.refreshToken,
                },
                {
                    refreshToken: '',
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                message: 'logout success',
            });
            return;
        } catch (err) {
            res.status(500).json({
                message: 'fail to logout',
                error: err,
            });
            return;
        }
    },

    // [POST] /auth/refresh
    refresh: async (req, res) => {
        try {
            const cookie = req.cookies;

            if (!cookie && !cookie.refreshToken) {
                return res.status(401).json({
                    message: 'you are not authenticated',
                });
            }

            jwt.verify(cookie.refreshToken, process.env.VERIFY_KEY, async (err, user) => {
                if (err) {
                    res.status(500).json({
                        message: 'fail to refresh token',
                        error: err,
                    });
                }

                const payload = {
                    _id: user._id,
                    admin: user.admin,
                };

                const account = await Account.findOne({ _id: user._id, refreshToken: cookie.refreshToken });

                if (account) {
                    const newAccessToken = jwt.sign(payload, process.env.ACCESS_KEY, {
                        expiresIn: '1d',
                    });

                    return res.status(200).json({
                        data: {
                            accessToken: newAccessToken,
                        },
                        message: 'refresh token success',
                    });
                }
            });
        } catch (err) {
            res.status(500).json({
                message: 'fail to logout',
                error: err,
            });
            return;
        }
    },
};

module.exports = authController;
