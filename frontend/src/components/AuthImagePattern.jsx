// Define AuthImagePattern component, accepting title and subtitle as props
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 pt-12">
      {/* Container div for the pattern, hidden on small screens and flex on large screens */}
      <div className="max-w-sm text-center">
        {/* Inner container with a maximum width and centered text */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {/* Grid layout with 3 columns and gap between items */}
          {[...Array(9)].map((_, i) => (
            // Create an array of 9 elements and map over it
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-secondary/10 ${
                // Assign a unique key for each div
                i % 2 === 0 ? "animate-pulse" : ""
                // Apply animation class every other element
              }`}
            />
          ))}
        </div>
        <h2 className="text-xl font-bold ">{title}</h2>{" "}
        {/* Display the title */}
        <p className="text-base-content/60">{subtitle}</p>{" "}
        {/* Display the subtitle */}
      </div>
    </div>
  );
};

export default AuthImagePattern; // Export AuthImagePattern component as default export
