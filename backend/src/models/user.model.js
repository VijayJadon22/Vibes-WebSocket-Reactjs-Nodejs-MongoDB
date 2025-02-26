import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

// Method to compare a provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password || "");
}

const User = mongoose.model("User", userSchema);
export default User;