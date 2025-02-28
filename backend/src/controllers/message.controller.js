import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

// Controller to get the list of users for the sidebar, excluding the logged-in user
export const getUsersForSidebar = async (req, res) => {
    try {
        // Extract the logged-in user's ID from the authenticated user attached to the request object
        const loggedInUserId = req.user._id;

        // Query the User collection to find users excluding the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Send a successful response with the filtered list of users
        return res.status(200).json(filteredUsers);
    } catch (error) {
        // Log any errors to the console
        console.error("Error in getUsersForSidebar controller: ", error.message);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to get messages between two users
export const getMessages = async (req, res) => {
    try {
        // Extract userToChatId from request parameters
        const { id: userToChatId } = req.params;
        // Extract myId from the authenticated user attached to the request object
        const myId = req.user._id;

        // Query the messages collection to find messages between the two users
        const messages = await Message({
            $or: [
                { senderId: userToChatId, receiverId: myId },
                { senderId: myId, receiverId: userToChatId }
            ]
        });

        // Send a successful response with the retrieved messages
        return res.status(200).json(messages);
    } catch (error) {
        // Log any errors to the console
        console.error("Error in getMessages controller: ", error.message);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to handle sending a message
export const sendMessage = async (req, res) => {
    try {
        // Extract receiverId from request parameters
        const { id: receiverId } = req.params;
        // Extract text and image from request body
        const { text, image } = req.body;
        // Extract senderId from the authenticated user attached to the request object
        const senderId = req.user._id;

        // Check if both text and image are missing in the request body
        if (!text && !image) {
            // Send a 400 Bad Request response if both text and image are missing
            return res.status(400).json({ message: "Image or text is required" });
        }

        let imageUrl;
        if (image) {
            // Upload the image to Cloudinary and get the response
            const uploadResponse = await cloudinary.uploader.upload(image);
            // Get the secure URL of the uploaded image
            imageUrl = uploadResponse.secure_url;
        }

        // Create a new message document
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        // Save the new message to the database
        await newMessage.save();

        // TODO: Add real-time functionality with socket.io here

        // Send a 201 Created response with the new message object
        return res.status(201).json(newMessage);

    } catch (error) {
        // Log any errors to the console
        console.error("Error in sendMessage controller: ", error.message);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
};