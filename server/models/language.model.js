import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    languageName: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: String, // Name of the person or organization who created the language
        required: true
    },
    country: {
        type: String, // Country where the language is primarily spoken or where it originated
        required: true
    },
    logo: {
        type: String // URL to the language logo
    },
    description: {
        type: String, // Brief description of the language
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Language = mongoose.model("Language", languageSchema);
