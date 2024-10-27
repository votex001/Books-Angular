import { getCollection } from "../../data/mongo.js";
import { loggerService } from "../../services/logger.service.js";

export const userService = {
  save,
  getByLogin,
};

async function save(userToSave) {
  try {
    const users = await getCollection("users");
    if (userToSave.id) {
      const { id, ...updateFields } = userToSave;
      const result = await users.updateOne(
        {
          _id: ObjectId.createFromHexString(id),
        },
        { $set: updateFields }
      );
      if (result.matchedCount === 0) {
        throw `Couldn't update user with id ${_id}`;
      }
    } else {
      users.insertOne(userToSave);
    }
    return userToSave;
  } catch (err) {
    console.error("userService[save] : ", err);
    loggerService.error(err)
    throw err;
  }
}

async function getByLogin(login) {
  try {
    const users = await getCollection("users");
    const user = await users.findOne({ login });
    return user;
  } catch (err) {
    console.log(err);
    loggerService.error(err)
    throw err;
  }
}
