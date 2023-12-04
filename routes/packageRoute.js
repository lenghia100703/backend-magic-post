const router = require('express').Router();
const RoleId = require('../constants');
const packageController = require('../controllers/packageController');
const checkRole = require('../middlewares/checkRole');
const verifyToken = require('../middlewares/verifyToken');

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

//get package to send
router.get(
    '/staff/transaction/send',
    verifyToken,
    checkRole(RoleId.TRANSACTION_STAFF_ROLE),
    packageController.getPackageToSend,
);

//get package from gathering point
router.get(
    '/manager/transaction/from',
    verifyToken,
    checkRole(RoleId.TRANSACTION_MANAGER_ROLE),
    packageController.getPackageFromGatheringInTransactionPoint,
);

module.exports = router;
