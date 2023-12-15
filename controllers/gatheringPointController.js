const GatheringPoint = require('../models/GatheringPoint');

const gatheringPointController = {
    // [GET] /point/gathering/
    getGatheringPoint: async (req, res) => {
        try {
            const gatheringPoint = await GatheringPoint.find();
            res.status(200).json({
                data: gatheringPoint,
                message: 'get gathering point success',
            });
            return;
        } catch (err) {
            res.status(404).json({
                error: err,
                message: 'not found',
            });
            return;
        }
    },
};

module.exports = gatheringPointController;
