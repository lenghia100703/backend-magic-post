const router = require('express').Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const upload = require('../middlewares/uploadImage');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const RoleId = require('../constants/index');

// edit user
router.put('/:userId', upload.single('avatar'), verifyToken, userController.editUser);

// admin routes
// create manager account
router.post('/admin/create-manager', verifyToken, checkRole(RoleId.ADMIN_ROLE), adminController.createManagerAccount);

// get all gathering manager accounts
router.get('/admin/gathering-manager', verifyToken, checkRole(RoleId.ADMIN_ROLE), adminController.getGatheringManager);

// get all transaction manager accounts
router.get(
    '/admin/transaction-manager',
    verifyToken,
    checkRole(RoleId.ADMIN_ROLE),
    adminController.getTransactionManager,
);

// edit manager account
router.put('/admin/edit/:managerId', verifyToken, checkRole(RoleId.ADMIN_ROLE), adminController.editManagerAccount);

//delete manager account
router.delete(
    '/admin/delete/:managerId',
    verifyToken,
    checkRole(RoleId.ADMIN_ROLE),
    adminController.deleteManagerAccount,
);

module.exports = router;
