import { X } from "lucide-react"; // Import the X icon from lucide-react
import { useAuthStore } from "../store/useAuthStore"; // Import useAuthStore hook from the auth store
import { useChatStore } from "../store/useChatStore"; // Import useChatStore hook from the chat store

// Define ChatHeader component
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore(); // Destructure selectedUser and setSelectedUser from useChatStore
  const { onlineUsers } = useAuthStore(); // Destructure onlineUsers from useAuthStore

  return (
    <div className="p-2.5 border-b border-base-300">
      {" "}
      {/* Container for the header with padding and bottom border */}
      <div className="flex items-center justify-between">
        {" "}
        {/* Flex container to position items */}
        <div className="flex items-center gap-3">
          {" "}
          {/* Flex container for avatar and user info with gap */}
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              {" "}
              {/* Avatar container with specified size and rounded corners */}
              <img
                src={selectedUser.profilePic || "/avatar.png"} // Display user's profile picture or default avatar
                alt={selectedUser.fullName} // Alt text for the image
              />
            </div>
          </div>
          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>{" "}
            {/* Display user's full name */}
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}{" "}
              {/* Display online/offline status */}
            </p>
          </div>
        </div>
        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          {" "}
          {/* Set selected user to null when clicked */}
          <X /> {/* Close icon */}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; // Export ChatHeader component as default export
