const District = require('../models/District');
const Province = require('../models/Province');

const districtController = {
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
};

module.exports = districtController;
