import express from "express";
import { verifyToken } from "./user.controller.js";

const router = express.Router();

router.post("/verifyToken", verifyToken);

export const userRoutes = router;
