const authController = require("../controllers/authController");

const router = require("express").Router();

// register router
router.post("/register", authController.register);

module.exports = router;
