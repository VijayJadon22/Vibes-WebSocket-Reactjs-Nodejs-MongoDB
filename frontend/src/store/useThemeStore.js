import { create } from "zustand";

// Create a Zustand store for theme management
export const useThemeStore = create((set) => ({
    // Initialize the theme state with the value from localStorage, or default to "dracula"
    theme: localStorage.getItem("chat-theme") || "dracula",

    // Define a function to set a new theme
    setTheme: (theme) => {
        // Store the new theme value in localStorage
        localStorage.setItem("chat-theme", theme);

        // Update the theme state in the store
        set({ theme });
    }
}));
