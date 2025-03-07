import { useState } from "react"; // Import React and useState hook
import { useAuthStore } from "../store/useAuthStore.js"; // Import useAuthStore from the store
import AuthImagePattern from "../components/AuthImagePattern.jsx"; // Import AuthImagePattern component
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"; // Import icons from lucide-react
import { Link } from "react-router-dom"; // Import Link component from react-router-dom

const LoginPage = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Destructure isLoggingIn and login from useAuthStore
  const { isLoggingIn, login } = useAuthStore();

  // Function to handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update formData state with new input value
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault(); // Prevent default form submission
    await login(formData); // Call login function with formData
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {" "}
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl  flex items-center justify-center  transition-colors">
                {/* Logo image */}
                <img
                  src="https://static.vecteezy.com/system/resources/previews/012/872/330/original/bubble-chat-icon-3d-png.png"
                  alt=""
                />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>{" "}
              {/* Title */}
              <p className="text-base-content/60">
                Sign in to your account
              </p>{" "}
              {/* Subtitle */}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />{" "}
                  {/* Mail icon */}
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />{" "}
                  {/* Lock icon */}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" /> // EyeOff icon for hidden password
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" /> // Eye icon for visible password
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-secondary w-full"
              disabled={isLoggingIn} // Disable button if logging in
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />{" "}
                  {/* Loading spinner */}
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-secondary">
                {" "}
                {/* Link to signup page */}
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default LoginPage; // Export the LoginPage component
