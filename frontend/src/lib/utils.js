// Export the function formatMessageTime, making it available for import in other files
export function formatMessageTime(date) {
    // Create a new Date object from the provided date, and format it as a localized time string
    // using the en-US locale and specific options for hour, minute, and hour12
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",       // Display the hour as a two-digit number
        minute: "2-digit",     // Display the minute as a two-digit number
        hour12: false,         // Use a 24-hour clock (hour12: false means 24-hour format)
    });
}
