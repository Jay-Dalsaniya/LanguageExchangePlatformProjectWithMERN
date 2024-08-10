import { Application } from "../models/application.model.js";
import { Course } from "../models/course.model.js";  // Changed 'course' to 'Course'

export const applyCourse = async (req, res) => {
    try {
        const userId = req.id;
        const courseId = req.params.id;
        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is required.",
                success: false
            })
        };
        // Check if the user has already applied for the course
        const existingApplication = await Application.findOne({ course: courseId, learner: userId });  // Changed 'applicant' to 'learner'

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this course",
                success: false
            });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);  // Changed 'course' to 'Course'
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false
            })
        }
        // Create a new application
        const newApplication = await Application.create({
            course: courseId,
            learner: userId,  // Changed 'applicant' to 'learner'
        });

        course.applications.push(newApplication._id);
        await course.save();
        return res.status(201).json({
            message: "Course applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedCourses = async (req, res) => {  // Changed 'getAppliedcourses' to 'getAppliedCourses'
    try {
        const userId = req.id;
        const application = await Application.find({ learner: userId })  // Changed 'applicant' to 'learner'
            .sort({ createdAt: -1 })
            .populate({
                path: 'course',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'language',  // Changed 'company' to 'language'
                    options: { sort: { createdAt: -1 } },
                }
            });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true  // Corrected spelling 'succees' to 'success'
        })
    } catch (error) {
        console.log(error);
    }
}

// Admin sees how many users have applied
export const getLearners = async (req, res) => {  // Changed 'getApplicants' to 'getLearners'
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate({  // Changed 'course' to 'Course'
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'learner'  // Changed 'applicant' to 'learner'
            }
        });
        if (!course) {
            return res.status(404).json({
                message: 'Course not found.',
                success: false
            })
        };
        return res.status(200).json({
            course, 
            success: true  // Corrected spelling 'succees' to 'success'
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            })
        };

        // Find the application by application ID
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}
