const Role = require('../models/Role');

const roleController = {
    // [GET] /role/
    getAll: async (req, res) => {
        try {
            const roles = await Role.find();
            res.status(200).json({
                data: roles,
                message: 'get all roles success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                error: error,
                message: 'fail to get all roles',
            });
            return;
        }
    },

    // [GET] /role/:roleId
    getRoleById: async (req, res) => {
        try {
            const role = await Role.findById(req.params.roleId);
            res.status(200).json({
                data: role,
                message: 'get by id success',
            });
            return;
        } catch (error) {
            res.status(404).json({
                error: error,
                message: 'not found',
            });
            return;
        }
    },

    // [GET] /role/code/:roleCode
    getRoleByCode: async (req, res) => {
        try {
            const role = await Role.find({ code: req.params.roleCode });
            res.status(200).json({
                data: role,
                message: 'get by code success',
            });
            return;
        } catch (error) {
            res.status(404).json({
                error: error,
                message: 'not found',
            });
            return;
        }
    },
};

module.exports = roleController;
