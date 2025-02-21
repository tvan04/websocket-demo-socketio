
# WebSocket Chat Demo

This is a simple WebSocket chat application using Socket.IO. It allows users to send messages to one another in real time. The current implementation echoes messages to connected clients. Your challenge is to modify the code so that messages are broadcast to all other clients (not echoed back to the sender).

## Getting Started

1) Clone the repository: I hope y'all know how to do this already

2) Install dependencies:

npm install


3) Run the application:

npm start


4) Open your web browser and navigate to http://localhost:3000. To test real-time functionality, open the URL in multiple browser tabs or windows.

5) Challenge Instructions

There are three TODO sections, one in server.js and one in client.js. Complete these to be able to send chat messages between different  browser tabs. 

Hint:
1. each TODO is only a couple lines of code max so don't overcomplicate it
2. Use the documentation tutorial to help guide you
https://socket.io/docs/v4/tutorial/step-1 
3. Keep naming uniform. For instance, ```socket.emit(event, data)``` takes an event parameter (which you'll need), so keep the event parameter the same throughout the code or else it won't work.