const authController = require('../controllers/authController');

const router = require('express').Router();

// register router
router.post('/register', authController.register);

// login router
router.post('/login', authController.login);

//logout router
router.post('/logout', authController.logout);

//refresh router
router.post('/refresh', authController.refresh);

module.exports = router;
