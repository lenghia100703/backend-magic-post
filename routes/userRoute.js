const router = require('express').Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadImage');
const verifyToken = require('../middlewares/verifyToken');

// edit user
router.put('/:userId', upload.single('avatar'), verifyToken, userController.editUser);

module.exports = router;
