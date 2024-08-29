const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
//const auth = require("../middlewares/auth").auth;
//const validate = require("../middlewares/validator").validate;

router.post("/", userController.register)//, auth, validate, userController.viewUserFavorites);

module.exports = router;