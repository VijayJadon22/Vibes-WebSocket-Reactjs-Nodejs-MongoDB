import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import { useChatStore } from "../store/useChatStore"; // Import useChatStore hook from store
import SidebarSkeleton from "./skeletons/SidebarSkeleton"; // Import SidebarSkeleton component for loading state
import { Users } from "lucide-react"; // Import Users icon from lucide-react
import { useAuthStore } from "../store/useAuthStore"; // Import useAuthStore hook from store

// Define Sidebar component
const Sidebar = () => {
  // Destructure values from useChatStore hook
  const { users, selectedUser, isUsersLoading, getUsers, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore(); // Destructure onlineUsers from useAuthStore hook
  const [showOnlineOnly, setShowOnlineOnly] = useState(false); // State to toggle showing online users only

  useEffect(() => {
    getUsers(); // Fetch users when component mounts
  }, [getUsers]);

  // Filter users based on showOnlineOnly state
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />; // Show loading skeleton if users are loading

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" /> {/* Users icon */}
          <span className="font-medium hidden lg:block">Contacts</span>{" "}
          {/* Contacts label */}
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online){" "}
            {/* Display count of online users, excluding self */}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id} // Unique key for each user
            onClick={() => setSelectedUser(user)} // Set selected user on click
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full" // User profile picture
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900" // Online status indicator
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}{" "}
                {/* Online/Offline status */}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; // Export Sidebar component as default export
