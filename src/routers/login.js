import express from "express";
import { login } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", login);

export default router;