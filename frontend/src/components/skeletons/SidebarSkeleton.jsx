import { Users } from "lucide-react"; // Import the Users icon from lucide-react

// Define SidebarSkeleton component
const SidebarSkeleton = () => {
  // Create an array of 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        {" "}
        {/* Header container with bottom border and padding */}
        <div className="flex items-center gap-2">
          {" "}
          {/* Flex container to position items with gap */}
          <Users className="w-6 h-6" /> {/* Users icon with specified size */}
          <span className="font-medium hidden lg:block">Contacts</span>{" "}
          {/* Contacts label, hidden on small screens */}
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {" "}
        {/* Container for skeleton contacts with vertical scrolling */}
        {skeletonContacts.map((_, idx) => (
          // Map over skeletonContacts array to create skeleton items
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />{" "}
              {/* Skeleton avatar with size and rounded corners */}
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />{" "}
              {/* Skeleton for user name */}
              <div className="skeleton h-3 w-16" />{" "}
              {/* Skeleton for user status */}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton; // Export SidebarSkeleton component as default export
