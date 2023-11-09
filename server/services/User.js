const User = require("../models/User");

const signupUserService = async (req, res) => {
  await User.findOne({ email: req.body.email }).then(async (result) => {
    if (result) {
      if (result.email === req.body.email) {
        return res.status(203).json({
          success: false,
          message: "Email already exists",
          result,
        });
      }
    } else {
      const creation = await User.create(req.body);
      return res.status(201).json({
        success: true,
        creation,
      });
    }
  });
};

const loginUserService = async (req, res) => {
  await User.findOne({
    $or: [{ email: req.body.email }, { number: req.body.email }],
  })
    .then((result) => {
      if (result == null) {
        return res.status(200).json({
          success: false,
          message: "User not Found",
        });
      } else {
        if (result.password === req.body.password) {
          return res.status(201).json({
            success: true,
            message: "User Found",
            result,
          });
        } else {
          return res.status(203).json({
            success: true,
            message: "Username or Password Incorrect",
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  signupUserService,
  loginUserService,
};
