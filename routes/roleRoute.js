const router = require('express').Router();
const roleController = require('../controllers/roleController');

// get all roles
router.get('/', roleController.getAll);

// get role by id
router.get('/:roleId', roleController.getRoleById);

// get role by code
router.get('/code/:roleCode', roleController.getRoleByCode);

module.exports = router;
