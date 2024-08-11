import { Language } from "../models/Language.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new language
export const registerLanguage = async (req, res) => {
    try {
        const { languageName } = req.body;
        if (!languageName) {
            return res.status(400).json({
                message: "Language name is required.",
                success: false
            });
        }
        let language = await Language.findOne({ languageName: languageName });
        if (language) {
            return res.status(400).json({
                message: "You can't register the same language.",
                success: false
            })

        };
        language = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Language registered successfully.",
            language,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get all languages registered by a user
export const getLanguages = async (req, res) => {  
    try {
        const userId = req.id; // logged in user id
        const languages = await Language.find({ userId });
        if (!languages) {
            return res.status(404).json({
                message: "Languages not found.",
                success: false
            })
        }
        return res.status(200).json({
            languages,  
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get language by id
export const getLanguageById = async (req, res) => {
    try {
        const languageId = req.params.id;  
        const language = await Language.findById(languageId);
        if (!language) {
            return res.status(404).json({
                message: "Language not found.",
                success: false
            })
        }
        return res.status(200).json({
            language,  
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update language details
export const updateLanguage = async (req, res) => {
    try {
        const { languageName, description, website, location } = req.body;

        const file = req.file;
        // Handle Cloudinary upload
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { languageName, description, website, location, logo };

        const updatedLanguage = await Language.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedLanguage) {
            return res.status(404).json({
                message: "Language not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Language information updated.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
