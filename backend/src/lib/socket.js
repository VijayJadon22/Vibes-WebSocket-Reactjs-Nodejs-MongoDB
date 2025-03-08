import { Server } from "socket.io"; // Import the Server class from the socket.io library
import http from "http"; // Import the HTTP module to create the server
import express from "express"; // Import the Express framework

const app = express(); // Create an instance of the Express application
const server = http.createServer(app); // Create an HTTP server using the Express application

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], // Allow cross-origin requests from the specified URL
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]; // Return the socket ID associated with the given user ID
}

// Used to store online users
const userSocketMap = {}; // Initialize an empty object to store user IDs and their corresponding socket IDs

io.on("connection", (socket) => {
    console.log("A user is connected", socket.id); // Log the connection event and the socket ID

    const userId = socket.handshake.query.userId; // Get the user ID from the query parameters of the handshake
    if (userId) userSocketMap[userId] = socket.id; // If a user ID is provided, store it in the userSocketMap with the socket ID

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit an event to all connected clients with the list of online users

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id); // Log the disconnection event and the socket ID
        delete userSocketMap[userId]; // Remove the user from the userSocketMap
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit an event to all connected clients with the updated list of online users
    });
});

export { io, app, server }; // Export the io, app, and server objects
