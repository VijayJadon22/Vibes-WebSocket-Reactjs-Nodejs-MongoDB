import { generateTokenAndSetCookie } from "../lib/utils.js";
import User from "../models/user.model.js";


export const signup = async (req, res) => {
    const { email, password, fullName } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const newUser = new User({
            email,
            fullName,
            password
        });

        if (newUser) {
            //generate jwt token and send in response
            generateTokenAndSetCookie(newUser, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller: ", error);
        return res.status(500).json({ error: "Internal server error" });
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