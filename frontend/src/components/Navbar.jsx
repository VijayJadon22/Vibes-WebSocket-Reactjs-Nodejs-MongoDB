import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

// Navbar component definition
const Navbar = () => {
  // Destructure authUser and logout from useAuthStore
  const { authUser, logout } = useAuthStore();

  // Function to handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    // Header element with various class names for styling
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 ">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg flex items-center justify-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/012/872/330/original/bubble-chat-icon-3d-png.png"
                  className="size-8 text-primary"
                />
              </div>
              <h1 className="text-lg font-bold">Vibes</h1>
            </Link>
          </div>

          {/* right part of nav */}
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
