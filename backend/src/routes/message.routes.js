import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

// Create a new router instance
const router = express.Router();

// Route to get users for the sidebar, excluding the logged-in user
router.get("/users", protectRoute, getUsersForSidebar); // Handles GET requests to /api/messages/users, checks authentication, and calls the getUsersForSidebar controller

// Route to get messages between two users
router.get("/:id", protectRoute, getMessages); // Handles GET requests to /api/messages/:id, checks authentication, and calls the getMessages controller

// Route to send a message to a user
router.post("/send/:id", protectRoute, sendMessage); // Handles POST requests to /api/messages/send/:id, checks authentication, and calls the sendMessage controller

// Export the router for use in other parts of the application
export default router;
