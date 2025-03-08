import { create } from "zustand"; // Import create function from Zustand to create a store
import toast from "react-hot-toast"; // Import toast for displaying notifications
import { axiosInstance } from "../lib/axios"; // Import axiosInstance for making HTTP requests
import { useAuthStore } from "./useAuthStore"; // Import useAuthStore hook from store

// Create a Zustand store for chat management
export const useChatStore = create((set, get) => ({
    messages: [], // Array to store messages
    users: [], // Array to store users
    selectedUser: null, // Currently selected user
    isUsersLoading: false, // Loading status for users
    isMessagesLoading: false, // Loading status for messages

    // Function to fetch users
    getUsers: async () => {
        set({ isUsersLoading: true }); // Set loading status to true
        try {
            const res = await axiosInstance.get("/messages/users"); // Send GET request to fetch users
            set({ users: res.data }); // Set users data if successful
        } catch (error) {
            console.log("Error in getUsers: ", error); // Log any errors
            toast.error(error.response.data.message); // Show error notification
        } finally {
            set({ isUsersLoading: false }); // Set loading status to false
        }
    },

    // Function to fetch messages for a specific user
    getMessages: async (userId) => {
        set({ isMessagesLoading: true }); // Set loading status to true
        try {
            const res = await axiosInstance.get(`/messages/${userId}`); // Send GET request to fetch messages
            set({ messages: res.data }); // Set messages data if successful
        } catch (error) {
            console.log("Error in getMessages: ", error); // Log any errors
            toast.error(error.response.data.message); // Show error notification
        } finally {
            set({ isMessagesLoading: false }); // Set loading status to false
        }
    },

    // Function to send a message
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData); // Send POST request to send message
            set({ messages: [...messages, res.data] }); // Append new message to messages array
        } catch (error) {
            console.log("Error in sendMessage: ", error); // Log any errors
            toast.error(error.response.data.message); // Show error notification
        }
    },

    // Function to subscribe to new messages via WebSocket
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return; // Return if no user is selected

        const socket = useAuthStore.getState().socket; // Get socket from auth store
        socket.on("newMessage", (newMessage) => { // Listen for newMessage event
            if (newMessage.senderId !== selectedUser._id) return; // Ignore messages from other users

            set({ messages: [...get().messages, newMessage] }); // Append new message to messages array
        });
    },

    // Function to unsubscribe from new messages
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket; // Get socket from auth store
        socket.off("newMessage"); // Stop listening for newMessage event
    },

    // Function to set the selected user
    setSelectedUser: (selectedUser) => set({ selectedUser }), // Set selected user
}));
