import express from "express";
import { upload } from "../middlewares/multer.js";
import { register, getAllUsers, getUserById, getUserByUsername, updateUserById, deleteUserById } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/authentication.js";
import { validID } from "../middlewares/validIdMongoose.js";
import { authorization } from "../middlewares/authorization.js";
import { cacheMiddleware, cacheGetAllMiddleware } from "../middlewares/cacheMiddleware.js";

const router = express.Router();

router.post("/", upload.single('image'), register); //C

router.get("/", cacheGetAllMiddleware, getAllUsers); // R
router.get("/id/:id", validID, cacheMiddleware, getUserById); // R
router.get("/username/:username", getUserByUsername); // R

router.put("/:id", validID, authentication, authorization('owner'), updateUserById) //U

router.delete("/:id", validID, authorization('owner'), deleteUserById); //D

export default router;