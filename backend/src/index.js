import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";

// Importing routes and database connection
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectToDB } from "./lib/db.js";

// Load environment variables from .env file
dotenv.config();
const app = express();

// Define the port on which the server will run
const PORT = process.env.PORT || 5001;

// Middleware to parse cookies
app.use(cookieParser());
// Middleware to parse JSON request bodies
app.use(express.json({ limit: "5mb" }));
// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from this origin
        credentials: true, // Allow cookies to be sent with requests
    })
);

// Use the authentication routes for any requests starting with /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
    // Connect to the database
    connectToDB();
});
