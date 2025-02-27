import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the User schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true, // Full name is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Email must be unique
    },
    password: {
        type: String,
        required: true, // Password is required
        minlength: 6, // Minimum length for password is 6 characters
    },
    profilePic: {
        type: String,
        default: "" // Default profile picture is an empty string
    }
}, { timestamps: true }); // Add timestamps to track creation and update times

// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to generate a JWT token for the user
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { // Generate a JWT token with the user ID as payload
        expiresIn: "15d" // The token expires in 15 days
    });
};

// Method to compare a provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password || ""); // Compare the provided password with the stored hash
}

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
