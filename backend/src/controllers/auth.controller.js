import { generateTokenAndSetCookie } from "../lib/utils.js";
import User from "../models/user.model.js";

// Signup controller function
export const signup = async (req, res) => {
    const { email, password, fullName } = req.body; // Extract email, password, and fullName from request body
    try {
        // Check if all required fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if password length is at least 6 characters
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }

        // Check if a user with the given email already exists
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        // Create a new user instance
        const newUser = new User({
            email,
            fullName,
            password
        });

        if (newUser) {
            // Generate JWT token and set it as an HTTP-only cookie
            generateTokenAndSetCookie(newUser, res);
            await newUser.save(); // Save the new user to the database

            // Respond with the new user's data
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller: ", error); // Log the error to the console
        return res.status(500).json({ error: "Internal server error" }); // Respond with a 500 status code and error message
    }
}


export const login = (req, res) => {
    try {

    } catch (error) {
        console.error("Error in signup controller: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
export const logout = (req, res) => {
    try {

    } catch (error) {

    }
}