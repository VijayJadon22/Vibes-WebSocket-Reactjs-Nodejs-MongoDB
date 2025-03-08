import axios from "axios";

// Create an Axios instance with custom configuration
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api", // The base URL for all API requests
    withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
});
