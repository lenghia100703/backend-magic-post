const District = require('../models/District');
const Province = require('../models/Province');

const districtController = {
    //[POST] /district/:provinceId
    createDistrict: async (req, res) => {
        try {
            const newDistrict = new District({
                name: req.body.name,
                code: req.body.code,
                provinceId: req.params.provinceId,
            });

            const savedDistrict = await newDistrict.save();
            await Province.findByIdAndUpdate(req.params.provinceId, {
                $push: {
                    districts: savedDistrict._id,
                },
            });
            res.status(200).json({
                message: 'create district success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: 'fail to create district',
                error: error,
            });
            return;
        }
    },

    // [GET] /district/
    getAll: async (req, res) => {
        try {
            const districts = await District.find();
            res.status(200).json({
                data: districts,
                message: 'get all districts success',
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: 'fail get all districts',
                error: error,
            });
            return;
        }
    },

    // [GET] /district/:districtId
    getDistrictById: async (req, res) => {
        try {
            const district = await District.findById(req.params.districtId);
            res.status(200).json({
                data: district,
                message: 'get district by id success',
            });
            return;
        } catch (error) {
            res.status(404).json({
                message: 'fail get district by id',
                error: error,
            });
            return;
        }
    },

    // [GET] /district/province/:provinceId
    getDistrictByProvinceId: async (req, res) => {
        try {
            const districts = await District.find({ provinceId: req.params.provinceId });
            res.status(200).json({
                data: districts,
                message: 'get district by province id success',
            });
            return;
        } catch (error) {
            res.status(404).json({
                message: 'fail get district by province id',
                error: error,
            });
            return;
        }
    },
};

module.exports = districtController;
