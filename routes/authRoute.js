const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

// register router
router.post('/register', authController.register);

// login router
router.post('/login', authController.login);

//logout router
router.post('/logout', authController.logout);

//refresh router
router.post('/refresh', authController.refresh);

//change password
router.put('/change-password', verifyToken, authController.changePassword);

module.exports = router;
