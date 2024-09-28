import express from "express";
import { login } from "../controllers/user.controller.js";

const router = express.Router();

//const auth = require("../middlewares/auth").auth;
//const validate = require("../middlewares/validator").validate;

router.post("/", login); //, auth, validate, multer, userController.viewUserFavorites);

export default router;