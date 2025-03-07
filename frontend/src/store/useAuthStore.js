import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

// Create a Zustand store for authentication management
export const useAuthStore = create((set) => ({
    // Initial state for the authentication store
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],

    // Function to check authentication status
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            // Set the authenticated user data if successful
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            // Set authUser to null if there's an error
            set({ authUser: null });
        } finally {
            // Set isCheckingAuth to false after the check is complete
            set({ isCheckingAuth: false });
        }
    },

    // Function to sign up a new user
    signup: async (data) => { // data will be an object: {fullName, email, password}
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            // Set the authenticated user data if successful
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.log("Error in signup: ", error);
            toast.error(error.response.data.message);
        } finally {
            // Set isSigningUp to false after the sign-up process is complete
            set({ isSigningUp: false });
        }
    },

    // Function to log in a user
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            // Set the authenticated user data if successful
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            console.log("Error in login: ", error);
            toast.error(error.response.data.message);
        } finally {
            // Set isLoggingIn to false after the login process is complete
            set({ isLoggingIn: false });
        }
    },

    // Function to log out the current user
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            // Clear the authenticated user data
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Error in logout: ", error);
            toast.error(error.response.data.message);
        }
    },

    // Function to update the user's profile
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            // Set the updated user data if successful
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in updateProfile: ", error);
            toast.error(error.response.data.message);
        } finally {
            // Set isUpdatingProfile to false after the profile update is complete
            set({ isUpdatingProfile: false });
        }
    }
}));
