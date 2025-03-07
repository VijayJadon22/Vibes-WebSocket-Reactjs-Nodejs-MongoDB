import { Camera, Mail, User } from "lucide-react"; // Importing icons from lucide-react library
import { useAuthStore } from "../store/useAuthStore.js"; // Importing the custom hook for authentication store
import { useState } from "react"; // Importing useState hook from React

const ProfilePage = () => {
  // Extracting necessary values and functions from the authentication store
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  // Initializing the state for the selected image
  const [selectedImg, setSelectedImg] = useState(null);

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Getting the frist selected file from the input
    if (!file) return; // If no file is selected, exit the function
    const reader = new FileReader(); // Creating a new FileReader object
    reader.readAsDataURL(file); // Reading the file as a data URL
    reader.onload = async () => {
      const base64Image = reader.result; // Getting the base64 encoded image
      setSelectedImg(base64Image); // Updating the state with the selected image
      await updateProfile({ profilePic: base64Image }); // Updating the profile with the new image
    };
  };

  return (
    <div className=" pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"} // Displaying the selected image, existing profile picture, or default avatar
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  } // Adding animation and disabling pointer events when updating profile
                `}
              >
                <Camera className="w-5 h-5 text-base-200" /> {/* Camera icon */}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden" // Hiding the file input
                  accept="image/*" // Accepting only image files
                  onChange={handleImageUpload} // Handling image upload on change
                  disabled={isUpdatingProfile} // Disabling the input when updating profile
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..." // Showing "Uploading..." message when updating profile
                : "Click the camera icon to update your photo"}{" "}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" /> {/* User icon */}
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName} {/* Displaying the full name */}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" /> {/* Mail icon */}
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email} {/* Displaying the email address */}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser.createdAt?.split("T")[0]}{" "}
                  {/* Displaying the account creation date */}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>{" "}
                {/* Displaying the account status */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; // Exporting the ProfilePage component
