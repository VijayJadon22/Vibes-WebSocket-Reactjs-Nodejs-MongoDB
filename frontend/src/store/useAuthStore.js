import { create } from "zustand"; // Import create function from Zustand to create a store
import { axiosInstance } from "../lib/axios.js"; // Import axiosInstance for making HTTP requests
import toast from "react-hot-toast"; // Import toast for displaying notifications
import { io } from "socket.io-client"; // Import io function from socket.io-client for WebSocket communication

const BASE_URL = "http://localhost:5001"; // Base URL for the server

// Create a Zustand store for authentication management
export const useAuthStore = create((set, get) => ({
    // Initial state for the authentication store
    authUser: null, // Authenticated user
    isSigningUp: false, // Signing up status
    isLoggingIn: false, // Logging in status
    isUpdatingProfile: false, // Updating profile status
    isCheckingAuth: true, // Checking authentication status
    onlineUsers: [], // List of online users
    socket: null, // WebSocket connection

    // Function to check authentication status
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // Send GET request to check authentication
            // Set the authenticated user data if successful
            set({ authUser: res.data });
            get().connectSocket(); // Connect to WebSocket if authentication is successful
        } catch (error) {
            console.log("Error in checkAuth: ", error); // Log any errors
            // Set authUser to null if there's an error
            set({ authUser: null });
        } finally {
            // Set isCheckingAuth to false after the check is complete
            set({ isCheckingAuth: false });
        }
    },

    // Function to sign up a new user
    signup: async (data) => { // data will be an object: {fullName, email, password}
        set({ isSigningUp: true }); // Set signing up status to true
        try {
            const res = await axiosInstance.post("/auth/signup", data); // Send POST request to sign up
            // Set the authenticated user data if successful
            set({ authUser: res.data });
            toast.success("Account created successfully"); // Show success notification
            get().connectSocket(); // Connect to WebSocket if sign up is successful
        } catch (error) {
            console.log("Error in signup: ", error); // Log any errors
            toast.error(error.response.data.message); // Show error notification
        } finally {
            // Set isSigningUp to false after the sign-up process is complete
            set({ isSigningUp: false });
        }
    },

    // Function to log in a user
    login: async (data) => {
        set({ isLoggingIn: true }); // Set logging in status to true
        try {
            const res = await axiosInstance.post("/auth/login", data); // Send POST request to log in
            // Set the authenticated user data if successful
            set({ authUser: res.data });
            toast.success("Logged in successfully"); // Show success notification
            get().connectSocket(); // Connect to WebSocket if login is successful
        } catch (error) {
            console.log("Error in login: ", error); // Log any errors
            toast.error(error.response.data.message); // Show error notification
        } finally {
            // Set isLoggingIn to false after the login process is complete
            set({ isLoggingIn: false });
        }
    },

    // Function to log out the current user
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout"); // Send POST request to log out
            // Clear the authenticated user data
            set({ authUser: null });
            toast.success("Logged out successfully"); // Show success notification
            get().disconnectSocket(); // Disconnect from WebSocket
        } catch (error) {
            console.log("Error in logout: ", error); // Log any errors
            toast.error(error.response.data.message); // Show error notification
        }
    },

    // Function to update the user's profile
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true }); // Set updating profile status to true
        try {
            const res = await axiosInstance.put("/auth/update-profile", data); // Send PUT request to update profile
            // Set the updated user data if successful
            set({ authUser: res.data });
            toast.success("Profile updated successfully"); // Show success notification
        } catch (error) {
            console.log("Error in updateProfile: ", error); // Log any errors
            toast.error(error.response.data.message); // Show error notification
        } finally {
            // Set isUpdatingProfile to false after the profile update is complete
            set({ isUpdatingProfile: false });
        }
    },

    // Function to connect to WebSocket
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return; // Return if user is not authenticated or socket is already connected
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id, // Send user ID as query parameter
            }
        });
        socket.connect(); // Connect to WebSocket
        set({ socket: socket }); // Set the socket in the store

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds }); // Update the list of online users
        });
    },

    // Function to disconnect from WebSocket
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect(); // Disconnect from WebSocket if connected
    },
}));
