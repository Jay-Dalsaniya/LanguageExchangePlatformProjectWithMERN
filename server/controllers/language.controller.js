import { Language } from "../models/language.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new language
export const registerLanguage = async (req, res) => {
    try {
        const { languageName, creator, country } = req.body;
        if (!languageName || !creator || !country) {
            return res.status(400).json({
                message: "Language name, creator, and country are required.",
                success: false
            });
        }
        let existingLanguage = await Language.findOne({ languageName: languageName });
        if (existingLanguage) {
            return res.status(400).json({
                message: "You can't register the same language.",
                success: false
            });
        }
        const newLanguage = await Language.create({
            languageName: languageName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Language registered successfully.",
            language: newLanguage,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
}

// Get all languages registered by a user
export const getLanguages = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const languages = await Language.find({ userId });
        if (!languages || languages.length === 0) {
            return res.status(404).json({
                message: "Languages not found.",
                success: false
            });
        }
        return res.status(200).json({
            languages,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred.",
            success: false
        });
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
            });
        }
        return res.status(200).json({
            language,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
}

// Update language details
export const updateLanguage = async (req, res) => {
    try {
        const { languageName, creator, country, description, website, location } = req.body;

        let logo;
        if (req.file) {
            // Handle Cloudinary upload
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = { languageName, creator, country, description, website, location };
        if (logo) updateData.logo = logo;

        const updatedLanguage = await Language.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedLanguage) {
            return res.status(404).json({
                message: "Language not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Language information updated.",
            language: updatedLanguage,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
}
