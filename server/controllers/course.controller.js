import { Course } from "../models/course.model.js";  // Changed 'course' to 'Course'

// Admin creates a course
export const postCourse = async (req, res) => {
    try {
        const { courseName, subject, platform, duration, fees, feeType, level, aboutCourse, language, position } = req.body;
        const userId = req.id;

        if (!courseName || !subject || !platform || !duration || !fees || !feeType || !level || !aboutCourse || !language || !position) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const course = await Course.create({
            courseName,
            subject,
            platform,
            duration,
            fees: Number(fees),
            feeType,
            level,
            aboutCourse,
            language, 
            created_by: userId,
            position
        });

        return res.status(201).json({
            message: "New course created successfully.",
            course,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

// For students
export const getAllCourses = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { courseName: { $regex: keyword, $options: "i" } },
                { aboutCourse: { $regex: keyword, $options: "i" } },
            ]
        };
        const courses = await Course.find(query).populate({
            path: "language"
        }).sort({ createdAt: -1 });

        if (!courses) {
            return res.status(404).json({
                message: "Courses not found.",
                success: false
            });
        }

        return res.status(200).json({
            courses,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

// For students
export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate({
            path: "applications"
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found.",
                success: false
            });
        }

        return res.status(200).json({ course, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

// Admin checks how many courses have been created
export const getAdminCourses = async (req, res) => {
    try {
        const adminId = req.id;
        const courses = await Course.find({ created_by: adminId }).populate({
            path: 'language',
            options: { sort: { createdAt: -1 } }
        });

        if (!courses) {
            return res.status(404).json({
                message: "Courses not found.",
                success: false
            });
        }

        return res.status(200).json({
            courses,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}
