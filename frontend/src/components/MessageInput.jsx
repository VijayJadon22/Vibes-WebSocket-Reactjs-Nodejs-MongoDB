import { useRef, useState } from "react"; // Import useRef and useState hooks from React
import { useChatStore } from "../store/useChatStore.js"; // Import useChatStore hook from store
import { Image, Send, X } from "lucide-react"; // Import icons from lucide-react
import toast from "react-hot-toast"; // Import toast for displaying notifications

// Define MessageInput component
const MessageInput = () => {
  const [text, setText] = useState(""); // State for message text
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const fileInputRef = useRef(); // Ref for file input element
  const { sendMessage } = useChatStore(); // Destructure sendMessage function from useChatStore hook

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file"); // Show error if the file is not an image
      return;
    }
    const reader = new FileReader(); // Create a new FileReader instance
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set image preview to the file's data URL
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

  // Remove image preview
  const removeImage = () => {
    setImagePreview(null); // Clear image preview state
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input value
  };

  // Handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!text.trim() && !imagePreview) return; // Do nothing if both text and image are empty
    try {
      await sendMessage({
        text: text.trim(), // Trim whitespace from text
        image: imagePreview, // Include image preview
      });

      // Clear form
      setText(""); // Clear text input
      setImagePreview(null); // Clear image preview
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input value
    } catch (error) {
      console.log("Failed to send message: ", error); // Log any errors
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700" // Image preview styling
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" /> {/* Close icon */}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)} // Update text state on input change
          />
          <input
            type="file"
            accept="image/*"
            className="hidden" // Hide file input
            ref={fileInputRef} // Attach ref to file input
            onChange={handleImageChange} // Handle file input change
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()} // Trigger file input click
          >
            <Image size={20} /> {/* Image icon */}
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview} // Disable button if text and image are empty
        >
          <Send size={22} /> {/* Send icon */}
        </button>
      </form>
    </div>
  );
};

export default MessageInput; // Export MessageInput component as default export
