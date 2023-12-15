const gatheringPointController = require('../controllers/gatheringPointController');

const router = require('express').Router();

// get gathering point
router.get('/gathering', gatheringPointController.getGatheringPoint);

module.exports = router;
