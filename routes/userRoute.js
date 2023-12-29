const router = require('express').Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const managerController = require('../controllers/managerController');
const transactionStaffController = require('../controllers/transactionStaffController');
const gatheringStaffController = require('../controllers/gatheringStaffController');
const customerController = require('../controllers/customerController');
const upload = require('../middlewares/uploadImage');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const RoleId = require('../constants/index');

// edit user
router.put('/:userId', upload.single('avatar'), verifyToken, userController.editUser);

router.get('/phone/:phoneNumber', verifyToken, userController.getUserByPhoneNumber);

router.get('/:userId', verifyToken, userController.getUserById);

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

// create gathering point
router.post(
    '/admin/create-gathering-point',
    verifyToken,
    checkRole(RoleId.ADMIN_ROLE),
    adminController.createGatheringPoint,
);

// create transaction point
router.post(
    '/admin/create-transaction-point',
    verifyToken,
    checkRole(RoleId.ADMIN_ROLE),
    adminController.createTransactionPoint,
);

// search manager gathering point
router.get(
    '/admin/search/gathering-manager',
    verifyToken,
    checkRole(RoleId.ADMIN_ROLE),
    adminController.getGatheringManagerByName,
);

// search manager transaction point
router.get(
    '/admin/search/transaction-manager',
    verifyToken,
    checkRole(RoleId.ADMIN_ROLE),
    adminController.getTransactionManagerByName,
);

// manager routes
// create staff account
router.post(
    '/manager/create-staff',
    verifyToken,
    checkRole([RoleId.GATHERING_MANAGER_ROLE, RoleId.TRANSACTION_MANAGER_ROLE]),
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

router.get(
    '/manager/search/gathering-staff',
    verifyToken,
    checkRole(RoleId.GATHERING_MANAGER_ROLE),
    managerController.getGatheringStaffByName,
);

router.get(
    '/manager/search/transaction-staff',
    verifyToken,
    checkRole(RoleId.TRANSACTION_MANAGER_ROLE),
    managerController.getTransactionStaffByName,
);

//edit staff account
router.put(
    '/manager/edit/:staffId',
    verifyToken,
    checkRole([RoleId.GATHERING_MANAGER_ROLE, RoleId.TRANSACTION_MANAGER_ROLE]),
    managerController.editStaffAccount,
);

// delete staff account
router.delete(
    '/manager/delete/:staffId',
    verifyToken,
    checkRole([RoleId.GATHERING_MANAGER_ROLE, RoleId.TRANSACTION_MANAGER_ROLE]),
    managerController.deleteStaffAccount,
);

// transaction staff routes
// create package to receiver
router.post(
    '/staff/transaction/create-package-to-receiver',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    transactionStaffController.createPackageToReceiver,
);

// confirm package from gathering point
router.put(
    '/staff/transaction/confirm-package-from-gathering/:packageId',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    transactionStaffController.confirmPackageFromGathering,
);

// send package to gathering point
router.put(
    '/staff/transaction/send-package-to-gathering/:packageId',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    transactionStaffController.sendPackageToGathering,
);

// confirm to receiver success
router.put(
    '/staff/transaction/confirm-to-receiver-success/:packageId',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    transactionStaffController.confirmToReceiverSuccess,
);

// confirm to receiver fail
router.put(
    '/staff/transaction/confirm-to-receiver-fail/:packageId',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    transactionStaffController.confirmToReceiverFail,
);

// gathering staff routes
// confirm package from transaction point
router.put(
    '/staff/gathering/confirm-package-from-transaction/:packageId',
    verifyToken,
    checkRole(RoleId.GATHERING_STAFF_ROLE),
    gatheringStaffController.confirmPackageFromTransaction,
);

// confirm package from gathering point
router.put(
    '/staff/gathering/confirm-package-from-gathering/:packageId',
    verifyToken,
    checkRole(RoleId.GATHERING_STAFF_ROLE),
    gatheringStaffController.confirmPackageFromGathering,
);

// send package to transaction point
router.put(
    '/staff/gathering/send-package-to-transaction/:packageId',
    verifyToken,
    checkRole(RoleId.GATHERING_STAFF_ROLE),
    gatheringStaffController.sendPackageToTransaction,
);

// send package to gathering point
router.put(
    '/staff/gathering/send-package-to-gathering/:packageId',
    verifyToken,
    checkRole(RoleId.GATHERING_STAFF_ROLE),
    gatheringStaffController.sendPackageToGathering,
);

//customer routes
// get orders
router.get(
    '/customer/search-order',
    verifyToken,
    checkRole([
        RoleId.CUSTOMER_ROLE,
        RoleId.ADMIN_ROLE,
        RoleId.GATHERING_MANAGER_ROLE,
        RoleId.TRANSACTION_MANAGER_ROLE,
    ]),
    customerController.getPackage,
);
module.exports = router;
