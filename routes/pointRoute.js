const gatheringPointController = require('../controllers/gatheringPointController');
const transactionPointController = require('../controllers/transactionPointController');

const router = require('express').Router();

// get gathering point
router.get('/gathering', gatheringPointController.getGatheringPoint);

// get transaction point by location
router.get('/transaction/:location', transactionPointController.getTransactionPointByLocation);

module.exports = router;
