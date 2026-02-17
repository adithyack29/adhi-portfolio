import mongoose from "mongoose";

export interface Contact extends mongoose.Document {
    name: string;
    email: string;
    projectType: string;
    message: string;
    createdAt: Date;
}

const ContactSchema = new mongoose.Schema<Contact>({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please provide a valid email",
        ],
    },
    projectType: {
        type: String,
        required: [true, "Please select a project type"],
        enum: ["Ad", "Reel", "Website", "Other"],
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
        maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Contact || mongoose.model<Contact>("Contact", ContactSchema);
