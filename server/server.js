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
// TODO: Implement the WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send a welcome message to the connected client
  socket.emit('message', 'Welcome to the WebSocket Chat!');

  // Broadcast the message to all clients except the sender
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });

  // Log disconnection events
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.port || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});