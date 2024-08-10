import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    languageName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String // URL to Language logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Language = mongoose.model("Language", languageSchema);
