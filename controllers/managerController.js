const RoleId = require('../constants');
const Account = require('../models/Account');
const bcrypt = require('bcrypt');

const managerController = {
    // [GET] /user/manager/gathering-staff?page=
    getGatheringStaff: async (req, res) => {
        try {
            const pageSize = 10;
            const skip = (req.query.page - 1) * pageSize;
            const accounts = await Account.find({ role: RoleId.GATHERING_STAFF_ROLE }).skip(skip).limit(pageSize);
            const totalData = await Account.countDocuments({ role: RoleId.GATHERING_STAFF_ROLE });
            res.status(200).json({
                data: accounts,
                message: 'get all gathering staff success',
                totalData: totalData,
            });
            return;
        } catch (error) {
            res.status(404).json({ error: error, message: 'fail to get gathering staff account' });
            return;
        }
    },

    // [GET] /user/manager/transaction-staff?page=
    getTransactionStaff: async (req, res) => {
        try {
            const pageSize = 10;
            const skip = (req.query.page - 1) * pageSize;
            const accounts = await Account.find({ role: RoleId.TRANSACTION_STAFF_ROLE }).skip(skip).limit(pageSize);
            const totalData = await Account.countDocuments({ role: RoleId.GATHERING_STAFF_ROLE });
            res.status(200).json({
                data: accounts,
                message: 'get all transaction staff success',
                totalData: totalData,
            });
            return;
        } catch (error) {
            res.status(404).json({ error: error, message: 'fail to get transaction staff account' });
            return;
        }
    },

    // [POST] /user/manager/create-staff
    createStaffAccount: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newStaffAccount = new Account({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone,
                role: req.body.role,
                workPlace: req.body.workPlace,
            });

            const account = await newStaffAccount.save();

            await Role.findByIdAndUpdate(
                req.body.role,
                {
                    $push: {
                        accounts: account._id,
                    },
                },
                { new: true },
            );

            if (req.body.role === RoleId.GATHERING_STAFF_ROLE) {
                await GatheringPoint.findOneAndUpdate(
                    {
                        location: req.body.workPlace,
                    },
                    {
                        $push: {
                            staffs: account._id,
                        },
                    },
                    {
                        new: true,
                    },
                );
            } else if (req.body.role === RoleId.TRANSACTION_STAFF_ROLE) {
                await TransactionPoint.findOneAndUpdate(
                    {
                        location: req.body.workPlace,
                    },
                    {
                        $push: {
                            staffs: account._id,
                        },
                    },
                    {
                        new: true,
                    },
                );
            }

            res.json(200).json({
                data: account,
                message: 'create staff account success',
            });
        } catch (error) {
            res.status(500).json({ error: error, message: 'fail to create staff account' });
            return;
        }
    },

    // [UPDATE] /user/manager/edit/:staffId
    editStaffAccount: async (req, res) => {
        try {
            const editStaffAccount = {
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
            };

            const newStaffAccount = await Account.findByIdAndUpdate(
                req.params.staffId,
                {
                    $set: editStaffAccount,
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                data: newStaffAccount,
                message: 'edit staff account success',
            });
        } catch (error) {
            res.status(500).json({ error: error, message: 'fail to edit staff account' });
            return;
        }
    },

    // [DELETE] /user/manager/delete/:staffId

    deleteStaffAccount: async (req, res) => {
        try {
            const deleteAccount = await Account.findById(req.params.staffId);
            await Account.findByIdAndDelete(req.params.staffId);

            await Role.findByIdAndUpdate(deleteAccount.role, {
                $pull: {
                    accounts: deleteAccount._id,
                },
            });

            if (deleteAccount.role === RoleId.GATHERING_STAFF_ROLE) {
                await GatheringPoint.findOneAndUpdate(
                    {
                        workPlace: deleteAccount.workPlace,
                    },
                    {
                        $pull: {
                            staffs: deleteAccount._id,
                        },
                    },
                    {
                        new: true,
                    },
                );
            } else if (deleteAccount.role === RoleId.TRANSACTION_STAFF_ROLE) {
                await TransactionPoint.findOneAndUpdate(
                    {
                        workPlace: deleteAccount.workPlace,
                    },
                    {
                        $pull: {
                            staffs: deleteAccount._id,
                        },
                    },
                    {
                        new: true,
                    },
                );
            }
        } catch (error) {
            res.status(500).json({ error: error, message: 'fail to delete staff account' });
            return;
        }
    },
};

module.exports = managerController;
