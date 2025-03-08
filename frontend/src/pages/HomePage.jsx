import { useChatStore } from "../store/useChatStore"; // Import useChatStore hook from store
import Sidebar from "../components/Sidebar.jsx"; // Import Sidebar component
import NoChatSelected from "../components/NoChatSelected.jsx"; // Import NoChatSelected component
import ChatContainer from "../components/ChatContainer.jsx"; // Import ChatContainer component

// Define HomePage component
const HomePage = () => {
  // Destructure selectedUser from useChatStore hook
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      {" "}
      {/* Container div for full screen height with background color */}
      <div className="flex items-center justify-center pt-20 px-4">
        {" "}
        {/* Center content with padding */}
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {" "}
          {/* Main content container with background color, rounded corners, and shadow */}
          <div className="flex h-full rounded-lg overflow-hidden">
            {" "}
            {/* Flex container with full height, rounded corners, and overflow hidden */}
            <Sidebar /> {/* Sidebar component */}
            {/* Conditional rendering: if selectedUser is not present, render NoChatSelected, else render ChatContainer */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; // Export HomePage component as default export
