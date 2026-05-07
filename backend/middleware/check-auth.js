import jwt from "jsonwebtoken";
import HttpError from "../util/http-error.js";

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN" on veut pas bearer

    if (!token) {
      throw new Error("Token manquant");
    }

    const decodedToken = jwt.verify(token, "cleSuperSecrete!");

    req.userData = {
      userId: decodedToken.userId,
      username: decodedToken.username
    };

    next();
  } catch (err) {
    return next(new HttpError("Authentification échouée", 401));
  }
};
