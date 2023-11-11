const District = require('../models/District');
const Province = require('../models/Province');

const provinceController = {
    // [POST] /province/
    createProvince: async (req, res) => {
        try {
            const newProvince = new Province({
                name: req.body.name,
                code: req.body.code,
            });
            await newProvince.save();
            res.status(200).json({
                message: 'create province success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: 'fail to create province',
                error: error,
            });
            return;
        }
    },

    // [GET] /province/
    getAll: async (req, res) => {
        try {
            const provinces = await Province.find().sort({ name: 1 });
            res.status(200).json({
                data: provinces,
                message: 'get all provinces success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: 'fail to get all provinces',
                error: error,
            });
            return;
        }
    },

    // [GET] /province/:provinceId
    getProvinceById: async (req, res) => {
        try {
            const province = await Province.findById(req.params.provinceId);
            res.status(200).json({
                data: province,
                message: 'get province by id success',
            });
            return;
        } catch (error) {
            res.status(404).json({
                message: 'fail to get province by id',
                error: error,
            });
            return;
        }
    },
};

module.exports = provinceController;
