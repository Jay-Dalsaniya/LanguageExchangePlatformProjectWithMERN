import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminCourses, getAllCourses, getCourseById, postCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postCourse);
router.route("/get").get(isAuthenticated, getAllCourses);
router.route("/getadmincourses").get(isAuthenticated, getAdminCourses);
router.route("/get/:id").get(isAuthenticated, getCourseById);

export default router;

