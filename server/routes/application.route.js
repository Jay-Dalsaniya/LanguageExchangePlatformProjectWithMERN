import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyCourse, getLearners, getAppliedCourses, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyCourse);
router.route("/get").get(isAuthenticated, getAppliedCourses);
router.route("/:id/learners").get(isAuthenticated, getLearners);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
