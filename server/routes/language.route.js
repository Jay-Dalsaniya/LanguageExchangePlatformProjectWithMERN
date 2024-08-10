import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getLanguages, getLanguageById, registerLanguage, updateLanguage } from "../controllers/language.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerLanguage);
router.route("/get").get(isAuthenticated,getLanguages);
router.route("/get/:id").get(isAuthenticated,getLanguageById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateLanguage);

export default router;

