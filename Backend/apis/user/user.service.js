import { getCollection } from "../../data/mongo.js";
import { loggerService } from "../../services/logger.service.js";
import { ObjectId } from "mongodb";

export const userService = {
  save,
  getByLogin,
  saveUnverifiedUser,
  getUnverifiedUserByLogin,
  updateUnverifiedUser,
  deleteUnverifiedUser,
};

// Сохранение подтвержденного пользователя в коллекцию "users"
async function save(userToSave) {
  try {
    const users = await getCollection("users");
    if (userToSave.id) {
      const { id, ...updateFields } = userToSave;
      const result = await users.updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: updateFields }
      );
      if (result.matchedCount === 0) {
        throw `Couldn't update user with id ${id}`;
      }
    } else {
      await users.insertOne(userToSave);
    }
    return userToSave;
  } catch (err) {
    console.error("userService[save] : ", err);
    loggerService.error(err);
    throw err;
  }
}

// Получение подтвержденного пользователя по логину
async function getByLogin(login) {
  try {
    const users = await getCollection("users");
    return await users.findOne({ login });
  } catch (err) {
    console.error("userService[getByLogin] : ", err);
    loggerService.error(err);
    throw err;
  }
}

// Saving an unverified user to a collection "unverifiedUsers"
async function saveUnverifiedUser(userToSave) {
  try {
    const unverifiedUsers = await getCollection("unverifiedUsers");
    await unverifiedUsers.insertOne(userToSave);
    return userToSave;
  } catch (err) {
    console.error("userService[saveUnverifiedUser] : ", err);
    loggerService.error(err);
    throw err;
  }
}

// Getting unconfirmed user by login
async function getUnverifiedUserByLogin(email) {
  try {
    const unverifiedUsers = await getCollection("unverifiedUsers");
    return await unverifiedUsers.findOne({ email });
  } catch (err) {
    console.error("userService[getUnverifiedUserByLogin] : ", err);
    loggerService.error(err);
    throw err;
  }
}

// Update unverified user
async function updateUnverifiedUser(userToUpdate) {
  try {
    const unverifiedUsers = await getCollection("unverifiedUsers");
    const { _id, ...updateFields } = userToUpdate;
    const result = await unverifiedUsers.updateOne(
      { _id: ObjectId.createFromHexString(_id) },
      { $set: updateFields }
    );
    if (result.matchedCount === 0) {
      throw `Couldn't update unverified user with id ${_id}`;
    }
    return userToUpdate;
  } catch (err) {
    console.error("userService[updateUnverifiedUser] : ", err);
    loggerService.error(err);
    throw err;
  }
}

// Removing an unconfirmed user by login
async function deleteUnverifiedUser(email) {
  try {
    const unverifiedUsers = await getCollection("unverifiedUsers");
    const result = await unverifiedUsers.deleteOne({ email });
    if (result.deletedCount === 0) {
      throw `Couldn't delete unverified user with login ${email}`;
    }
  } catch (err) {
    console.error("userService[deleteUnverifiedUser] : ", err);
    loggerService.error(err);
    throw err;
  }
}
