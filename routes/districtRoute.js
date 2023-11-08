const router = require('express').Router();
const districtController = require('../controllers/districtController');

router.post('/:provinceId', districtController.createDistrict);

module.exports = router;
