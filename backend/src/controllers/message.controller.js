import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        // Log any errors to the console
        console.error("Error in getUsersForSidebar controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message({
            $or: [
                { senderId: userToChatId, receiverId: myId },
                { senderId: myId, receiverId: userToChatId }
            ]
        });
        return res.status(200).json(messages);
    } catch (error) {
        // Log any errors to the console
        console.error("Error in getMessages controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}