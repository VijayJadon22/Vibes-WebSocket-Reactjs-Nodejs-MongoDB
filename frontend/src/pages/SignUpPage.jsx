import { useState } from "react"; // Import useState hook from React
import { useAuthStore } from "../store/useAuthStore"; // Import useAuthStore from the store
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react"; // Import icons from lucide-react
import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import AuthImagePattern from "../components/AuthImagePattern"; // Import AuthImagePattern component
import toast from "react-hot-toast"; // Import toast for notifications

// SignUpPage component definition
const SignUpPage = () => {
  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to handle form data
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  // Destructure isSigningUp and signup from useAuthStore
  const { isSigningUp, signup } = useAuthStore();

  // Function to validate form data
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required"); // Check if email is provided
    if (!formData.fullName.trim()) return toast.error("Full name is required"); // Check if full name is provided
    if (!formData.password) return toast.error("Password is required"); // Check if password is provided
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format"); // Check if email format is valid
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters"); // Check if password length is at least 6 characters
    return true; // Return true if all validations pass
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update formData state with new input value
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const success = validateForm(); // Validate form data
    if (success === true) signup(formData); // Call signup function if validation is successful
  };

  return (
    <div className="h-full grid lg:grid-cols-2">
      {" "}
      {/* Container for the signup page */}
      {/* Left side of the form or page */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl flex items-center justify-center  transition-colors">
                {/* Logo image */}
                <img
                  src="https://static.vecteezy.com/system/resources/previews/012/872/330/original/bubble-chat-icon-3d-png.png"
                  alt=""
                />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>{" "}
              {/* Title */}
              <p className="text-base-content/60">
                Get started with your free account
              </p>{" "}
              {/* Subtitle */}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full name input field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />{" "}
                  {/* User icon */}
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  name="fullName"
                />
              </div>
            </div>

            {/* Email input field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />{" "}
                  {/* Mail icon */}
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
            </div>

            {/* Password input field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />{" "}
                  {/* Lock icon */}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
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
                    <EyeOff className="size-5 text-base-content/40" /> // EyeOff icon for hidden password
                  ) : (
                    <Eye className="size-5 text-base-content/40" /> // Eye icon for visible password
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-secondary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />{" "}
                  {/* Loading spinner */}
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-secondary">
                Sign in
              </Link>{" "}
              {/* Link to login page */}
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage; // Export the SignUpPage component
