// Import the Cloudinary library, using ES6 module syntax and aliasing it as "cloudinary"
import { v2 as cloudinary } from "cloudinary";

// Import the dotenv configuration to load environment variables from the .env file
import { config } from "dotenv";
// Call config() to load environment variables from the .env file into process.env
config();

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
});

// Export the configured Cloudinary instance for use in other parts of the application
export default cloudinary;