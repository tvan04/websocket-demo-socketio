// Import the WebSocketServer class from the 'ws' package
import { WebSocketServer } from 'ws';

// Create a new WebSocket server listening on port 8080
const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server is running on ws://localhost:8080');

// Listen for client connections
wss.on('connection', (ws) => {
  console.log('A new client connected!');

  // Listen for messages from the connected client
  ws.on('message', (data) => {
    console.log('Received: %s', data);

    // Echo the received message back to the sender
    ws.send(`Server: You sent -> ${data}`);
  });

  // Log when a client disconnects
  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});

/* 
  === Hidden Extension: Broadcast Feature ===
  
  Challenge for the class: Modify the message handler so that when a client sends a message,
  the server broadcasts it to *all* connected clients (instead of just echoing back to the sender).

  Hidden Answer (uncomment to enable):

  wss.on('connection', (ws) => {
    console.log('A new client connected!');

    ws.on('message', (data) => {
      console.log('Received: %s', data);
      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(`Broadcast: ${data}`);
        }
      });
    });

    ws.on('close', () => {
      console.log('Client has disconnected');
    });
  });

  (Hint: Replace or modify the existing 'message' event handler with the above code.)
*/
