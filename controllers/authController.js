const Account = require("../models/Account");
const bcrypt = require("bcrypt");

const authController = {
  // [POST] /auth/register
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newAccount = new Account({
        username: req.body.username,
        password: hashed,
        email: req.body.email,
      });

      const account = await newAccount.save();
      res.status(200).json({
        data: account,
        message: "sign up success",
      });
      return;
    } catch (err) {
      res.status(500).json({
        message: "fail to sign up",
        error: err,
      });
      return;
    }
  },
};

module.exports = authController;
