# Messaging Application

The **Messaging Application** is a real-time chat platform built using **React**, **Zustand** for state management, and **Lucide-React** for icons. The application allows users to send and receive messages, view contacts' statuses (online/offline), and update their profile. The app is designed with responsiveness in mind, ensuring a smooth experience on both desktop and mobile devices.

## Features

- **Profile Management**: Users can update their profile information and profile picture.
- **Real-Time Messaging**: Users can send text and image messages in real-time.
- **Online Status**: The application displays which users are online in real-time.
- **User Authentication**: Users can log in and out, with their authentication state managed via a custom hook.
- **Responsive UI**: The app is designed to be fully responsive across devices.

## Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Features and Functions](#features-and-functions)
  - [Profile Management](#profile-management)
  - [Real-Time Messaging](#real-time-messaging)
  - [Online Status](#online-status)
  - [User Authentication](#user-authentication)
- [Components Breakdown](#components-breakdown)
  - [Navbar](#navbar)
  - [Sidebar](#sidebar)
  - [ChatHeader](#chatheader)
  - [ChatContainer](#chatcontainer)
  - [MessageInput](#messageinput)
- [State Management](#state-management)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the project locally, follow the steps below:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/messaging-app.git
    cd messaging-app
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Tech Stack

- **Frontend**: React, Zustand, React Router, Tailwind CSS
- **Icons**: Lucide-React
- **Backend**: Node.js, Express (not detailed here, assuming it's built for API requests)
- **State Management**: Zustand for managing global state
- **Real-Time Communication**: WebSockets (not detailed here, assuming the app is set up for real-time messages)

## Features and Functions

### 1. Profile Management

- **Functions Involved (Frontend)**: 
    - `handleLogout`: Logs the user out by calling the `logout` function from the `useAuthStore`.
    - Users can update their profile information in the `Profile` page (not shown in detail).

- **Backend (Functions)**: 
    - An API endpoint to fetch user details and update user profile data.
    - **GET** `/api/user/:id` - Fetches the user profile.
    - **PUT** `/api/user/:id` - Updates the user profile, including profile image.

- **UI Rendering**: 
    - The Profile page displays the user’s profile information. The Navbar will show the `Profile` button when the user is authenticated, which leads to the Profile page.

### 2. Real-Time Messaging

- **Functions Involved (Frontend)**: 
    - `getMessages`: Fetches the messages for the selected user.
    - `subscribeToMessages`: Subscribes to new messages in real-time.
    - `unsubscribeFromMessages`: Unsubscribes from the message stream when the component unmounts.
    - `setSelectedUser`: Sets the user for whom the messages are to be displayed.

- **Backend (Functions)**: 
    - **GET** `/api/messages/:userId`: Fetches the messages between the current user and the selected user.
    - **POST** `/api/messages`: Sends a new message.
    - **WebSocket** or **Socket.io** for real-time communication to push new messages to the user.

- **UI Rendering**:
    - The `ChatContainer` component displays the messages between users, with timestamps and a bubble-style UI. The `MessageInput` component allows the user to send new messages.

### 3. Online Status

- **Functions Involved (Frontend)**: 
    - `onlineUsers`: Managed in the state store and provides the list of online users.
    - `showOnlineOnly`: Toggles whether only online users are displayed in the sidebar.

- **Backend (Functions)**: 
    - **WebSocket** or **Socket.io**: To track users’ online statuses in real-time.

- **UI Rendering**: 
    - The `Sidebar` component displays contacts, and users who are online are highlighted. A toggle allows the user to view only online users.

### 4. User Authentication

- **Functions Involved (Frontend)**: 
    - `useAuthStore`: Custom hook to manage authentication state.
    - `logout`: Function that handles the user’s logout by clearing the session or token.
    - `authUser`: Contains the authenticated user's details.

- **Backend (Functions)**:
    - **POST** `/api/login`: Handles user login by validating credentials and returning a JWT token.
    - **POST** `/api/logout`: Clears the session or token on the backend.

- **UI Rendering**: 
    - The `Navbar` component shows the login/logout button based on authentication state.

## Components Breakdown

### Navbar

The `Navbar` component is the top navigation bar that provides links to the Profile, Settings, and Logout functionalities.

- **Functions**:
    - `handleLogout`: Logs the user out by calling `logout` from the `useAuthStore`.

- **UI Rendering**:
    - Shows the app logo.
    - If authenticated, displays `Profile`, `Settings`, and `Logout` buttons.

### Sidebar

The `Sidebar` component lists users in a chat application and has functionality to filter and show only online users.

- **Functions**:
    - `showOnlineOnly`: State variable to toggle the visibility of only online users.
    - `getUsers`: Fetches users from the backend.
    - `setSelectedUser`: Sets the selected user for chat.

- **UI Rendering**:
    - Displays a list of users.
    - Highlights users that are online.
    - Toggles between showing all users and only online users.

### ChatHeader

The `ChatHeader` component shows the profile of the currently selected user along with their online/offline status.

- **Functions**:
    - Displays the name and avatar of the selected user.
    - Shows "Online" or "Offline" based on the user’s status.

- **UI Rendering**:
    - Shows the selected user's name and avatar.
    - Displays a "close" button to deselect the user.

### ChatContainer

The `ChatContainer` component is responsible for displaying the chat history and the message input area.

- **Functions**:
    - `getMessages`: Fetches the messages for the selected user.
    - `messages`: Displays the list of messages for the selected user.

- **UI Rendering**:
    - Displays messages as chat bubbles.
    - Scrolls to the bottom when a new message is added.
    - Contains a `MessageInput` component for sending messages.

### MessageInput

The `MessageInput` component allows the user to send new messages to the selected user.

- **Functions**:
    - Handles the input of new messages.
    - Sends the message to the backend when the user submits it.

- **UI Rendering**:
    - A text input for typing messages.
    - A button to send the message.

## State Management

The app uses **Zustand** for state management. Zustand handles the global state of the app, such as user authentication, messages, and user lists.

- **`useAuthStore`**: Manages authentication state.
- **`useChatStore`**: Manages chat-related states such as messages, selected user, and online users.

## Technologies Used

- **Frontend**:
  - React
  - Zustand
  - Tailwind CSS
  - Lucide-React (icons)
  
- **Backend**:
  - Node.js
  - Express
  - WebSocket or Socket.io for real-time communication

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
