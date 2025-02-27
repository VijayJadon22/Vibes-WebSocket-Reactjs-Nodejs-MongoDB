// Function to generate a JWT token and set it as an HTTP-only cookie in the response
export const generateTokenAndSetCookie = (user, res) => {
    const token = user.getJWTToken(); // Get the JWT token from the user model instance

    res.cookie("token", token, {
        httpOnly: true, // The cookie is only accessible by the web server, not client-side JavaScript
        secure: process.env.NODE_ENV !== "development", // The cookie is only sent over HTTPS in non-development environments
        maxAge: 7 * 24 * 60 * 60 * 1000, // The cookie expires in 7 days (in milliseconds)
        sameSite: "strict" // Use "lax" to allow cookies for POST requests
    });
};

