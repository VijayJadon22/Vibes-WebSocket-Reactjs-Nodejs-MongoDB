import mongoose from "mongoose";

// Define the Message schema
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        required: true, // Sender ID is required
        ref: "User" // Reference the User model
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId
        required: true, // Receiver ID is required
        ref: "User" // Reference the User model
    },
    text: {
        type: String, // Type is String
        // Message text content (not required, can be empty)
    },
    image: {
        type: String, // Type is String
        // URL of the image (not required, can be empty)
    }
}, { timestamps: true }); // Add timestamps to track creation and update times

// Create and export the Message model
const Message = mongoose.model("Message", messageSchema);
export default Message;
