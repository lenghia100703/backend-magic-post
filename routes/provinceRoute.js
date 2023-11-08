const router = require('express').Router();

const provinceController = require('../controllers/provinceController');

router.post('/', provinceController.createProvince);

module.exports = router;
