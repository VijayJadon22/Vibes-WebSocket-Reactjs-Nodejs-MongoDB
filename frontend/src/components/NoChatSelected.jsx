import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-4">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl  flex items-center
             justify-center animate-bounce"
            >
              {/* <MessageSquare className="w-8 h-8 text-primary " /> */}
              <img
                className="w-16 h-16 text-primary "
                src="https://static.vecteezy.com/system/resources/previews/012/872/330/original/bubble-chat-icon-3d-png.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Vibes!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
