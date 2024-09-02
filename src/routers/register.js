import express from "express";
import { register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

//const auth = require("../middlewares/auth").auth;
//const validate = require("../middlewares/validator").validate;

router.post("/", upload.single('image'), register)//, auth, validate, multer, userController.viewUserFavorites); 

export default router;