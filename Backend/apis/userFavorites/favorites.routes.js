import express from "express"
import { requireAuth } from "../../middlewares/require-auth.js"
import { myFav, postMyFovBook } from "./favorites.controller.js"

const router = express.Router()




router.get("/",requireAuth,myFav)
router.post("/",requireAuth,postMyFovBook)
router.delete("/",requireAuth,myFav)



export const userFavorites = router