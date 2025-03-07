import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  // Destructure authentication-related state and actions from the auth store
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  // Destructure theme state from the theme store
  const { theme } = useThemeStore();

  // useEffect hook to check authentication status when the component mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth user: ", authUser);

  // If authentication is being checked and no user is authenticated, show a loader
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Main return statement for rendering the app
  return (
    <div data-theme={theme}>
      {/* Navbar component */}
      <Navbar />

      {/* Routes component for defining route paths and corresponding components */}
      <Routes>
        {/* HomePage route - accessible only if user is authenticated */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />

        {/* SignUpPage route - accessible only if user is not authenticated */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />

        {/* LoginPage route - accessible only if user is not authenticated */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        {/* SettingsPage route - accessible to all users */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* ProfilePage route - accessible only if user is authenticated */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>

      {/* Toaster component for displaying toast notifications */}
      <Toaster />
    </div>
  );
};

export default App;
