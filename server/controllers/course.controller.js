import { Course } from "../models/course.model.js";  // Changed 'course' to 'Course'

// Admin creates a course
export const postCourse = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, courseType, experience, position, languageId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !courseType || !experience || !position || !languageId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        const course = await Course.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            courseType,
            experienceLevel: experience,
            position,
            language: languageId,  // Changed 'company' to 'language'
            created_by: userId
        });
        return res.status(201).json({
            message: "New course created successfully.",
            course,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// For students
export const getAllCourses = async (req, res) => {  // Changed 'getAllcourses' to 'getAllCourses'
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const courses = await Course.find(query).populate({
            path: "language"  // Changed 'company' to 'language'
        }).sort({ createdAt: -1 });
        if (!courses) {
            return res.status(404).json({
                message: "Courses not found.",
                success: false
            })
        };
        return res.status(200).json({
            courses,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// For students
export const getCourseById = async (req, res) => {  // Changed 'getcourseById' to 'getCourseById'
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate({
            path: "applications"
        });
        if (!course) {
            return res.status(404).json({
                message: "Course not found.",
                success: false
            })
        };
        return res.status(200).json({ course, success: true });
    } catch (error) {
        console.log(error);
    }
}

// Admin checks how many courses have been created
export const getAdminCourses = async (req, res) => {  // Changed 'getAdmincourses' to 'getAdminCourses'
    try {
        const adminId = req.id;
        const courses = await Course.find({ created_by: adminId }).populate({
            path: 'language',  // Changed 'company' to 'language'
            options: { sort: { createdAt: -1 } }
        });
        if (!courses) {
            return res.status(404).json({
                message: "Courses not found.",
                success: false
            })
        };
        return res.status(200).json({
            courses,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
