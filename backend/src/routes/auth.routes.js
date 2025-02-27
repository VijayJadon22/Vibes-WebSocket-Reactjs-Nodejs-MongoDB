import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

// Create a new router instance
const router = express.Router();

// Route for user signup
router.post("/signup", signup); // Handles POST requests to /api/auth/signup and calls the signup controller

// Route for user login
router.post("/login", login); // Handles POST requests to /api/auth/login and calls the login controller

// Route for user logout
router.post("/logout", logout); // Handles POST requests to /api/auth/logout and calls the logout controller

// Route to update user profile, protected by the protectRoute middleware
router.put("/update-profile", protectRoute, updateProfile);
// Handles PUT requests to /api/auth/update-profile, checks authentication, and calls the updateProfile controller

// Route to check user authentication status, protected by the protectRoute middleware
// Handles GET requests to /api/auth/check, checks authentication, and calls the checkAuth controller
router.get("/check", protectRoute, checkAuth);

// Export the router for use in other parts of the application
export default router;
