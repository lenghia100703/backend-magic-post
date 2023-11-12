const router = require('express').Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadImage');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

// edit user
router.put('/:userId', upload.single('avatar'), verifyToken, userController.editUser);

// admin routes

// create manager account
router.post(
    '/admin/create-manager',
    verifyToken,
    checkRole(process.env.ADMIN_ROLE),
    userController.createManagerAccount,
);
module.exports = router;
