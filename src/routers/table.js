import express from "express";
import { authentication } from "../middlewares/authentication.js";
import { validID } from "../middlewares/validIdMongoose.js";
import { authorization } from "../middlewares/authorization.js";
import { cacheMiddleware, cacheGetAllMiddleware } from "../middlewares/cacheMiddleware.js";

const router = express.Router();

router.post("/", authentication, authorization('owner'), createTable); //C

router.get("/", cacheGetAllMiddleware, getAllTables); // R
router.get("/:casino", getTablesByCasino); // R
router.get("/table/:id", validID, cacheMiddleware, getTableById); // R

router.put("/:id", validID, authentication, authorization('owner'), updateTableByIdAndCasinoOwner) //U Jwt

router.delete("/:id", validID, authorization('owner'), deleteTableById); //D

export default router;