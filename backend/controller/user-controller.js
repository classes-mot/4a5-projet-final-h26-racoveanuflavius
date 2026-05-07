import HttpError from "../util/http-error.js";
import { User } from "../model/user.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    return next(new HttpError("Erreur BD lors de la vérification", 500));
  }

  if (existingUser) {
    return next(new HttpError("Nom d'utilisateur déjà utilisé", 422));
  }

  const newUser = new User({
    username,
    password,
    favorites: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Impossible de créer l'utilisateur", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      "cleSuperSecrete!",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Erreur lors de la génération du token", 500));
  }

  res.status(201).json({
    userId: newUser.id,
    username: newUser.username,
    token,
  });
};



export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  let user;
  try {
    user = await User.findOne({ username });
  } catch (err) {
    return next(new HttpError("Erreur BD lors de la connexion", 500));
  }

  if (!user || user.password !== password) {
    return next(new HttpError("Identifiants invalides", 401));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user.id, username: user.username },
      "cleSuperSecrete!",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Erreur lors de la génération du token", 500));
  }

  res.json({
    userId: user.id,
    username: user.username,
    token,
  });
};


export const getMe = async (req, res, next) => {
  const userId = req.userData.userId;

  let user;
  try {
    user = await User.findById(userId).select("-password");
  } catch (err) {
    return next(new HttpError("Erreur BD", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  res.json(user);
};



export const getUser = async (req, res, next) => {
  const userId = req.userData.userId;

  let user;
  try {
    user = await User.findById(userId).select("-password");
  } catch (err) {
    return next(new HttpError("Erreur BD", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  res.json(user);
};



export const getUserById = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid).select("-password");
  } catch (err) {
    return next(new HttpError("Erreur BD lors de la récupération", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  res.json(user);
};




export const updateUser = async (req, res, next) => {
  const uid = req.params.uid;
  const { username } = req.body;

  let updatedUser;
  try {
    updatedUser = await User.findByIdAndUpdate(
      uid,
      { username },
      { new: true }
    ).select("-password");
  } catch (err) {
    return next(new HttpError("Impossible de modifier l'utilisateur", 500));
  }

  if (!updatedUser) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  res.json(updatedUser);
};




export const deleteUser = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findByIdAndDelete(uid);
  } catch (err) {
    return next(new HttpError("Impossible de supprimer l'utilisateur", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  res.json({ message: "Utilisateur supprimé" });
};




export const addFavorite = async (req, res, next) => {
  const uid = req.params.uid;
  const batimentId = req.params.bid;


  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    return next(new HttpError("Erreur BD", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  // éviter doubles
  if (user.favorites.includes(batimentId)) {
    return next(new HttpError("Déjà dans les favoris", 422));
  }

  user.favorites.push(batimentId);

  try {
    await user.save();
  } catch (err) {
    return next(new HttpError("Impossible d'ajouter aux favoris", 500));
  }

  res.json({ message: "Favori ajouté", favorites: user.favorites });
};


export const removeFavorite = async (req, res, next) => {
  const userId = req.params.uid;
  const batimentId = req.params.bid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Impossible de trouver l'utilisateur", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  user.favorites = user.favorites.filter(
    (id) => id.toString() !== batimentId
  );

  try {
    await user.save();
  } catch (err) {
    return next(new HttpError("Impossible de supprimer le favori", 500));
  }

  res.status(200).json({
    message: "Favori supprimé",
    favorites: user.favorites
  });
};


export const getFavorites = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate("favorites");
  } catch (err) {
    return next(new HttpError("Impossible de récupérer les favoris", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur introuvable", 404));
  }

  res.status(200).json({
    favorites: user.favorites
  });
};

