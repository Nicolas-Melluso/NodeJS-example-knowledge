import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

//const auth = require("../middlewares/auth").auth;
//const validate = require("../middlewares/validator").validate;

router.post("/", userController)//, auth, validate, userController.viewUserFavorites);

module.exports = router;