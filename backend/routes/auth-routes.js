import express from "express";
import { check } from "express-validator";
import { registerUser, loginUser } from "../controller/user-controller.js";

const router = express.Router();


router.post(
  "/register",
  [
    check("username").not().isEmpty(),
    check("password").not().isEmpty()
  ],
  registerUser
);


router.post("/login", loginUser);

export default router;
