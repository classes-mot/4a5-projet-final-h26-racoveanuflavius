import express from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  addFavorite,
  removeFavorite,
  getFavorites,
  getMe
} from "../controller/user-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.use(checkAuth);

// GET
router.get("/me", getMe);
router.get("/:uid", getUserById);

// PATCH 
router.patch("/:uid", updateUser);

// DELETE
router.delete("/:uid", deleteUser);

// POST 
router.post("/:uid/favorites/:bid", addFavorite);
router.delete("/:uid/favorites/:bid", removeFavorite);
router.get("/:uid/favorites", getFavorites);


export default router;
