import cloudinary from "../lib/cloudinary.js";
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
        console.error("Error in signup controller: ", error.message); // Log the error to the console
        return res.status(500).json({ error: "Internal server error" }); // Respond with a 500 status code and error message
    }
}

// Function to handle user login
export const login = async (req, res) => {
    // Extract email and password from the request body
    console.log(req.body);
    const { email, password } = req.body;
    try {
        // Check if email or password is missing in the request body
        if (!email || !password) {
            // Send a 400 Bad Request response if either field is missing
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user in the database by email
        const user = await User.findOne({ email });
        // Check if the user is not found
        if (!user) {
            // Send a 400 Bad Request response if the credentials are invalid
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the stored password hash
        const isPasswordMatch = await user.comparePassword(password);
        // Check if the passwords do not match
        if (!isPasswordMatch) {
            // Send a 400 Bad Request response if the credentials are invalid
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token and set it as an HTTP-only cookie in the response
        generateTokenAndSetCookie(user, res);

        // Send a successful response with user details
        return res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic
        });
    } catch (error) {
        // Log any errors to the console
        console.error("Error in login controller: ", error);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Function to handle user logout
export const logout = (req, res) => {
    try {
        // Clear the authentication token cookie
        res.clearCookie("token");
        // Send a successful response indicating the user has logged out
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        // Log any errors to the console
        console.error("Error in logout controller: ", error.message);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Function to update the user's profile picture
export const updateProfile = async (req, res) => {
    try {
        // Extract profilePic from the request body
        const { profilePic } = req.body;
        // Extract userId from the authenticated user attached to the request object
        const userId = req.user._id;

        // Check if profilePic is provided in the request body
        if (!profilePic) {
            // Send a 400 Bad Request response if profilePic is missing
            return res.status(400).json({ message: "Profile pic is required" });
        }

        // Upload the profile picture to Cloudinary and get the response
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // Find the user by userId and update their profilePic with the secure URL from Cloudinary
        const updatedUser = await User.findByIdAndUpdate(userId,
            { profilePic: uploadResponse.secure_url },
            { new: true } // Return the updated user object
        );

        // Send a successful response with the updated user object
        return res.status(200).json(updatedUser);
    } catch (error) {
        // Log any errors to the console
        console.error("Error in updateProfile controller: ", error.message);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Function to check if the user is authenticated and return user information
export const checkAuth = (req, res) => {
    try {
        // Send a successful response with the authenticated user object
        return res.status(200).json(req.user);
    } catch (error) {
        // Log any errors to the console
        console.error("Error in checkAuth controller: ", error.message);
        // Send a 500 Internal Server Error response in case of an exception
        return res.status(500).json({ error: "Internal server error" });
    }
};
