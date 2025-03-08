import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";

import path from "path";

// Importing routes and database connection
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectToDB } from "./lib/db.js";
import { app,server } from "./lib/socket.js";

// Load environment variables from .env file
dotenv.config();

// Define the port on which the server will run
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

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


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

// Start the server and listen on the defined port
server.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
    // Connect to the database
    connectToDB();
});
