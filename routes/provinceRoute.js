const router = require('express').Router();

const provinceController = require('../controllers/provinceController');

// create province
router.post('/', provinceController.createProvince);

// get all provinces
router.get('/', provinceController.getAll);

//get province by id
router.get('/:provinceId', provinceController.getProvinceById);

module.exports = router;
