import { useEffect, useRef } from "react"; // Import useEffect and useRef hooks from React
import { useChatStore } from "../store/useChatStore.js"; // Import useChatStore hook from store
import MessageInput from "./MessageInput.jsx"; // Import MessageInput component
import ChatHeader from "./ChatHeader.jsx"; // Import ChatHeader component
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx"; // Import MessageSkeleton component for loading state
import { useAuthStore } from "../store/useAuthStore.js"; // Import useAuthStore hook from store
import { formatMessageTime } from "../lib/utils.js"; // Import formatMessageTime function for formatting message time

// Define ChatContainer component
const ChatContainer = () => {
  const {
    messages, // Destructure messages from useChatStore
    getMessages, // Destructure getMessages function from useChatStore
    isMessagesLoading, // Destructure isMessagesLoading from useChatStore
    selectedUser, // Destructure selectedUser from useChatStore
    subscribeToMessages, // Destructure subscribeToMessages function from useChatStore
    unsubscribeFromMessages, // Destructure unsubscribeFromMessages function from useChatStore
  } = useChatStore();

  const { authUser } = useAuthStore(); // Destructure authUser from useAuthStore
  const messageEndRef = useRef(); // Create a ref for the end of the message list

  // Fetch messages and subscribe to new messages on component mount and when selectedUser changes
  useEffect(() => {
    getMessages(selectedUser._id); // Fetch messages for selected user
    subscribeToMessages(); // Subscribe to new messages

    return () => unsubscribeFromMessages(); // Unsubscribe from messages on component unmount
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Scroll to the end of the message list when messages change
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Display loading skeleton if messages are loading
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader /> {/* Render ChatHeader component */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message._id} // Unique key for each message
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef} // Attach ref to the last message
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                {" "}
                {/* Avatar styling */}
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  } // Display user's profile picture or default avatar
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}{" "}
                {/* Display formatted message time */}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2" // Image attachment styling
                />
              )}
              {message.text && <p>{message.text}</p>}{" "}
              {/* Display message text */}
            </div>
          </div>
        ))}
      </div>
      <MessageInput /> {/* Render MessageInput component */}
    </div>
  );
};

export default ChatContainer; // Export ChatContainer component as default export
