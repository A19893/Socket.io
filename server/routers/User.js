const express= require("express");
const { signupUser, loginUser } = require("../controllers/User");

const router= express.Router();

router.post('/', signupUser);
router.post('/login', loginUser);

module.exports = router;