import express from "express"
import { requireAuth } from "../../middlewares/require-auth.js"
import { deleteBookFromFav, myFav, postMyFovBook } from "./favorites.controller.js"

const router = express.Router()




router.get("/",requireAuth,myFav)
router.post("/",requireAuth,postMyFovBook)
router.delete("/:bookId",requireAuth,deleteBookFromFav)



export const userFavorites = router