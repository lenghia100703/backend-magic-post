const router = require('express').Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const managerController = require('../controllers/managerController');
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

// manager routes
// create staff account
router.post(
    '/manager/create-staff',
    verifyToken,
    checkRole(RoleId.GATHERING_MANAGER_ROLE || RoleId.TRANSACTION_MANAGER_ROLE),
    managerController.createStaffAccount,
);

//get all gathering staff account
router.get(
    '/manager/gathering-staff',
    verifyToken,
    checkRole(RoleId.GATHERING_MANAGER_ROLE),
    managerController.getGatheringStaff,
);

//get all transaction staff account
router.get(
    '/manager/transaction-staff',
    verifyToken,
    checkRole(RoleId.TRANSACTION_MANAGER_ROLE),
    managerController.getTransactionStaff,
);

//edit staff account
router.put(
    '/manager/edit/:staffId',
    verifyToken,
    checkRole(RoleId.GATHERING_MANAGER_ROLE || RoleId.TRANSACTION_MANAGER_ROLE),
    managerController.editStaffAccount,
);

// delete staff account
router.delete(
    '/manager/delete/:staffId',
    verifyToken,
    checkRole(RoleId.GATHERING_MANAGER_ROLE || RoleId.TRANSACTION_MANAGER_ROLE),
    managerController.deleteStaffAccount,
);
module.exports = router;
