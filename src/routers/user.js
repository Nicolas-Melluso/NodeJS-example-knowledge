import express from "express";
import { upload } from "../middlewares/multer.js";
import { register, getAllUsers, getUserById, getUserByUsername, updateUserById, deleteUserById } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/authentication.js";

const router = express.Router();

//const auth = require("../middlewares/auth").auth;
//const validate = require("../middlewares/validator").validate;

router.post("/", upload.single('image'), register); //C

router.get("/", getAllUsers); //, auth, validate, multer, userController.viewUserFavorites);
router.get("/id/:id", getUserById); // R
router.get("/username/:username", getUserByUsername); // R

router.put("/:id", authentication, updateUserById) //U

router.delete("/:id", deleteUserById); //D

export default router;