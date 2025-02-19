# WebSocket Chat Demo

This is a simple WebSocket chat application. It allows users to send messages to one another in real time. The current implementation echoes messages to connected clients. Your challenge is to modify the code so that messages are broadcast to all other clients (not echoed back to the sender).

## Getting Started

1) Clone the repository: I hope y'all know how to do this already

2) Install dependencies:
    npm install

3) Run the application:
    npm start

4) Open your web browser and navigate to http://localhost:3000. To test real-time functionality, open the URL in multiple browser tabs or windows.

5) Challenge Instructions
Currently, the code echoes each message back only to the sender. Your challenge is to modify the code so that:
    When a message is sent from one browser, it is received by all other connected clients. 
    Instead of using ws.send(...) in the message event handler, iterate through wss.clients and send the message to every client except the sender.

Hint:
    In server.js, locate the message event handler and replace the line below with a loop through wss.clients:
      ws.send(`${ws.username}: ${data}`);
