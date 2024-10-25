import { userFavService } from "./favorites.service.js";

export async function myFav(req, res) {
  try {
    const userId = req.loggedinUser.id;
    const userBooks = await userFavService.getUserBooks(userId);
    if (!userBooks) return res.status(404).send({ error: "Books not found" });
    res.send(userBooks);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: "Books not found" });
  }
}

export async function postMyFovBook(req, res) {
  try {
    const userId = req.loggedinUser.id;
    const { book } = req.body;
    const ans = await userFavService.save(userId, book);
    res.send(ans);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: "Couldn't save books to library of user" });
  }
}
