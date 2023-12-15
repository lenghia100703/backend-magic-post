const router = require('express').Router();
const RoleId = require('../constants');
const packageController = require('../controllers/packageController');
const checkRole = require('../middlewares/checkRole');
const verifyToken = require('../middlewares/verifyToken');

// get package shipping
router.get(
    '/staff/transaction/shipping',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    packageController.getPackageShipping,
);

// get package success
router.get(
    '/staff/transaction/success',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    packageController.getPackageSuccess,
);

// get package fail
router.get(
    '/staff/transaction/fail',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    packageController.getPackageFail,
);

//get package to send by transaction staff
router.get(
    '/staff/transaction/send',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    packageController.getPackageToSend,
);

//get package delivery by transaction staff
router.get(
    '/staff/transaction/delivery',
    verifyToken,
    checkRole([RoleId.TRANSACTION_STAFF_ROLE, RoleId.TRANSACTION_MANAGER_ROLE]),
    packageController.getPackageDelivery,
);

//get package to send by gathering staff
router.get(
    '/staff/gathering/send',
    verifyToken,
    checkRole(RoleId.GATHERING_STAFF_ROLE),
    packageController.getPackageFromGathering,
);

//get package delivery by gathering staff
router.get(
    '/staff/gathering/delivery',
    verifyToken,
    checkRole(RoleId.GATHERING_STAFF_ROLE),
    packageController.getPackageToGathering,
);

//get package from gathering point
router.get(
    '/manager/transaction/from',
    verifyToken,
    checkRole([RoleId.TRANSACTION_MANAGER_ROLE, RoleId.ADMIN_ROLE]),
    packageController.getPackageFromGatheringInTransactionPoint,
);

//get package to gathering point
router.get(
    '/manager/transaction/to',
    verifyToken,
    checkRole([RoleId.TRANSACTION_MANAGER_ROLE, RoleId.ADMIN_ROLE]),
    packageController.getPackageToGatheringInTransactionPoint,
);

// get package to gathering point
router.get(
    '/manager/gathering/to',
    verifyToken,
    checkRole([RoleId.GATHERING_MANAGER_ROLE, RoleId.ADMIN_ROLE]),
    packageController.getPackageToGatheringInGatheringPoint,
);

router.get(
    '/manager/gathering/from',
    verifyToken,
    checkRole([RoleId.GATHERING_MANAGER_ROLE, RoleId.ADMIN_ROLE]),
    packageController.getPackageFromGatheringInGatheringPoint,
);

module.exports = router;
