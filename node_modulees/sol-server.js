const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/client.html'));
});

// Handle WebSocket connections
io.on('connection', (socket) => {

  // Send a welcome message to the connected client
  socket.emit('message', 'Welcome to the WebSocket Chat!');

  // TODO: listen for a message event and broadcast the message to all clients except the sender
  // hint: https://socket.io/docs/v4/tutorial/step-5
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });

  // Log disconnection events
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});