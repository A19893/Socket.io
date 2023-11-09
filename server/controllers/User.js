const {signupUserService, loginUserService} = require("../services/User")

const signupUser = async (req, res) => {
  const response = signupUserService(req, res);
  return response;
};

const loginUser = async (req, res) => {
  const response = loginUserService(req, res);
  return response;
};

module.exports = {
  signupUser,
  loginUser,
};
