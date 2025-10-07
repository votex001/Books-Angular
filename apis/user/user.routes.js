import express from "express";
import { updateUser, updateUserImage, verifyToken } from "./user.controller.js";
import { requireAuth } from "../../middlewares/require-auth.js";
import { upload } from "../../middlewares/multer.js";

const router = express.Router();

router.post("/verifyToken", verifyToken);
router.put("/", requireAuth, updateUser);
router.post("/updateImage",requireAuth,upload.single("file"),updateUserImage)

export const userRoutes = router;
