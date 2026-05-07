import HttpError from "../util/http-error.js";
import { validationResult } from "express-validator";
import { Batiment } from "../model/Batiment.js";

// get
export const getBuildings = async (req, res, next) => {
  try {
    const buildings = await Batiment.find();
    res.json(buildings);
  } catch (err) {
    next(new HttpError("Impossible de récupérer les bâtiments", 500));
  }
};


export const getBuildingById = async (req, res, next) => {
  const bid = req.params.bid;

  try {
    const building = await Batiment.findById(bid);
    if (!building) return next(new HttpError("Bâtiment introuvable", 404));

    res.json(building);
  } catch (err) {
    next(new HttpError("Erreur lors de la récupération", 500));
  }
};

// POST
export const createBuilding = async (req, res, next) => {
  const { nom, adresse, danger, dateAbandon, histoire, imageUrl } = req.body;

  const newBuilding = new Batiment({
    nom,
    adresse,
    danger,
    dateAbandon,
    histoire,
    imageUrl
  });

  try {
    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (err) {
    next(new HttpError("Impossible de créer le bâtiment", 500));
  }
};

// PATCH
export const updateBuilding = async (req, res, next) => {
  const bid = req.params.bid;
  const { nom, adresse, danger, dateAbandon, histoire, imageUrl } = req.body;

  try {
    const building = await Batiment.findByIdAndUpdate(
      bid,
      { nom, adresse, danger, dateAbandon, histoire, imageUrl },
      { new: true }
    );

    if (!building) return next(new HttpError("Bâtiment introuvable", 404));

    res.json(building);
  } catch (err) {
    next(new HttpError("Impossible de modifier le bâtiment", 500));
  }
};

// DELETE
export const deleteBuilding = async (req, res, next) => {
  const bid = req.params.bid;

  try {
    const building = await Batiment.findByIdAndDelete(bid);
    if (!building) return next(new HttpError("Bâtiment introuvable", 404));

    res.json({ message: "Bâtiment supprimé" });
  } catch (err) {
    next(new HttpError("Impossible de supprimer le bâtiment", 500));
  }
};
