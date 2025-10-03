import express from "express";
import { updateUser, verifyToken } from "./user.controller.js";
import { requireAuth } from "../../middlewares/require-auth.js";

const router = express.Router();

router.post("/verifyToken", verifyToken);
router.put("/", requireAuth, updateUser);

export const userRoutes = router;
