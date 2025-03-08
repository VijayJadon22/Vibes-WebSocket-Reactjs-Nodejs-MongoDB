import mongoose from "mongoose"; // Import the Mongoose library to interact with MongoDB

export const connectToDB = async () => { // Define an asynchronous function to connect to the database
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); // Attempt to connect to MongoDB using the connection string from environment variables
        console.log(`MongoDB connected: ${conn.connection.host}`); // Log a success message with the host of the connected database
    } catch (error) {
        console.log("Error connecting to DB in connectToDb: ", error); // Log an error message if the connection attempt fails
    }
}
