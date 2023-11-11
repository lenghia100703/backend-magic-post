const router = require('express').Router();
const districtController = require('../controllers/districtController');

// create district
router.post('/:provinceId', districtController.createDistrict);

// get all districts
router.get('/', districtController.getAll);

//get district by id
router.get('/:districtId', districtController.getDistrictById);

//get district by province id
router.get('/province/:provinceId', districtController.getDistrictByProvinceId);

module.exports = router;
