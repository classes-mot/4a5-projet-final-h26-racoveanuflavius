import express from "express";
import { check } from "express-validator";
import {
  getBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding
} from "../controller/batiments-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

// GET
router.get("/", getBuildings); 
router.get("/:bid", getBuildingById);


//privé
router.use(checkAuth);

// POST 
router.post(
  "/",
  [
    check("nom").not().isEmpty(),
    check("adresse").not().isEmpty(),
    check("danger").isArray(),
    check("histoire").not().isEmpty()
  ],
  createBuilding
);

// PATCH
router.patch("/:bid", updateBuilding);

// DELETE
router.delete("/:bid", deleteBuilding);

export default router;
