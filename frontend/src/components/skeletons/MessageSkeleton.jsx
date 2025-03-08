// Define MessageSkeleton component
const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        // Map over skeletonMessages array to create skeleton message items
        <div
          key={idx} // Unique key for each skeleton message item
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`} // Alternate message alignment
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              {" "}
              {/* Avatar container with specified size and rounded corners */}
              <div className="skeleton w-full h-full rounded-full" />{" "}
              {/* Skeleton avatar */}
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />{" "}
            {/* Skeleton for message header */}
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px]" />{" "}
            {/* Skeleton for message bubble */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton; // Export MessageSkeleton component as default export
