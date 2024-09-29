import express from "express";
import { upload } from "../middlewares/multer.js";
import { register, getAllUsers, getUserById, getUserByUsername, updateUserById, deleteUserById } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/authentication.js";
import { validID } from "../middlewares/validIdMongoose.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();

//const auth = require("../middlewares/auth").auth;
//const validate = require("../middlewares/validator").validate;

router.post("/", upload.single('image'), register); //C

router.get("/", getAllUsers); //, auth, validate, multer, userController.viewUserFavorites);
router.get("/id/:id", validID, getUserById); // R
router.get("/username/:username", getUserByUsername); // R

router.put("/:id", validID, authentication, updateUserById) //U

router.delete("/:id", validID, authorization('owner'), deleteUserById); //D

export default router;