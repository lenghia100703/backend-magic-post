const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const RoleId = require('../constants/index');
const GatheringPoint = require('../models/GatheringPoint');
const TransactionPoint = require('../models/TransactionPoint');
const Role = require('../models/Role');

const adminController = {
    // [GET] /user/admin/gathering-manager
    getGatheringManager: async (req, res) => {
        try {
            const accounts = await Account.find({ role: RoleId.GATHERING_MANAGER_ROLE });
            res.status(200).json({
                data: accounts,
                message: 'get all gathering manager accounts success',
            });
        } catch (error) {
            res.status(404).json({ error: error, message: 'fail to get gathering manager account' });
            return;
        }
    },

    // [GET] /user/admin/transaction-manager
    getTransactionManager: async (req, res) => {
        try {
            const accounts = await Account.find({ role: RoleId.TRANSACTION_MANAGER_ROLE });
            res.status(200).json({
                data: accounts,
                message: 'get all transaction manager accounts success',
            });
        } catch (error) {
            res.status(404).json({ error: error, message: 'fail to get transaction manager account' });
            return;
        }
    },

    // [POST] /user/admin/create-manager
    createManagerAccount: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newManagerAccount = new Account({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone,
                workPlace: req.body.workPlace,
                role: req.body.role,
            });

            const account = await newManagerAccount.save();

            await Role.findByIdAndUpdate(
                req.body.role,
                {
                    $push: {
                        accounts: account._id,
                    },
                },
                { new: true },
            );

            if (req.body.role === RoleId.GATHERING_MANAGER_ROLE) {
                await GatheringPoint.findOneAndUpdate(
                    {
                        location: req.body.workPlace,
                    },
                    {
                        managerId: account._id,
                    },
                    {
                        new: true,
                    },
                );
            } else if (req.body.role === RoleId.TRANSACTION_MANAGER_ROLE) {
                await TransactionPoint.findOneAndUpdate(
                    {
                        location: req.body.workPlace,
                    },
                    {
                        managerId: account._id,
                    },
                    {
                        new: true,
                    },
                );
            }

            res.status(200).json({
                data: account,
                message: 'create manager account success',
            });
            return;
        } catch (error) {
            res.status(500).json({ error: error, message: 'fail to create manager account' });
            return;
        }
    },

    // [UPDATE] /user/admin/edit/:managerId
    editManagerAccount: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const oldManagerAccount = await Account.findById(req.user._id);
            const editManagerAccount = {
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone,
                role: req.body.role,
                workPlace: req.body.workPlace,
            };

            const editAccount = await Account.findByIdAndUpdate(
                req.params.managerId,
                { $set: editManagerAccount },
                {
                    new: true,
                },
            );

            if (req.body.role === RoleId.GATHERING_MANAGER_ROLE) {
                await GatheringPoint.findOneAndUpdate(
                    {
                        location: req.body.workPlace,
                    },
                    {
                        managerId: editAccount._id,
                    },
                    {
                        new: true,
                    },
                );
            } else if (req.body.role === RoleId.TRANSACTION_MANAGER_ROLE) {
                await TransactionPoint.findOneAndUpdate(
                    {
                        location: req.body.workPlace,
                    },
                    {
                        managerId: editAccount._id,
                    },
                    {
                        new: true,
                    },
                );
            }

            await Role.findByIdAndUpdate(oldManagerAccount.role, {
                $pull: {
                    accounts: oldManagerAccount._id,
                },
            });

            await Role.findByIdAndUpdate(req.body.role, {
                $push: {
                    accounts: editAccount._id,
                },
            });

            res.status(200).json({
                message: 'edit manager account success',
                data: editAccount,
            });
            return;
        } catch (error) {
            res.status(500).json({ error: error, message: 'fail to edit manager account' });
            return;
        }
    },

    // [DELETE] /user/admin/delete/:managerId
    deleteManagerAccount: async (req, res) => {
        try {
            const deleteAccount = await Account.findById(req.params.managerId);
            await Account.findByIdAndDelete(req.params.managerId);

            await Role.findByIdAndUpdate(deleteAccount.role, {
                $pull: {
                    accounts: deleteAccount._id,
                },
            });

            if (deleteAccount.role === RoleId.GATHERING_MANAGER_ROLE) {
                await GatheringPoint.findOneAndUpdate(
                    {
                        managerId: deleteAccount._id,
                    },
                    {
                        managerId: '',
                    },
                    {
                        new: true,
                    },
                );
            } else if (deleteAccount.role === RoleId.TRANSACTION_MANAGER_ROLE) {
                await TransactionPoint.findOneAndUpdate(
                    {
                        managerId: deleteAccount._id,
                    },
                    {
                        managerId: '',
                    },
                    {
                        new: true,
                    },
                );
            }

            res.status(200).json({
                message: 'delete manager account success',
            });
        } catch (error) {
            res.status(500).json({ error: error, message: 'fail to delete manager account' });
            return;
        }
    },
};

module.exports = adminController;
