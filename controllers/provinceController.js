const District = require('../models/District');
const Province = require('../models/Province');

const provinceController = {
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
};

module.exports = provinceController;
