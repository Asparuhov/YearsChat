**Realtime Chat Application**

This repository contains a simple realtime chat application built with React, Node.js, Express, and Socket.io. Users can join chat rooms, exchange messages, and even edit or delete their messages.

Getting Started
To run the application locally, follow these steps:

Installation
Navigate to both the server and client folders and run:
```
npm install
```
This will install the necessary dependencies for both the server and client.

**Running Locally**

Open different 2 or more browsers with different cache (incognito), so the localStorage doesn't sync.
Start the server:
```
cd server
npm start
```

Start the client:
```
cd client
npm start
```
**Usage**

1. Open the frontend in a browser.
2. Enter your name and the room ID you want to join.
3. Users who want to chat with each other need to join the same room.
4. Upon entering the same room, users will be redirected to a chat window.
5. Chat in real-time via web sockets (Socket.io).
6. Users can edit and delete messages, view the sender, and timestamp.
7. Edit form has validation (edited message must be different and not empty).
8. Login form has validators (name <= 10 characters, room ID <= 5 characters).
9. You can send messages by clicking the Enter button (just like the real chat apps)

**Technologies Used**
Frontend:

1. React
2. Material-UI
3. Socket.io-client
   
Backend:

1. Node.js
2. Express
3. Socket.io

