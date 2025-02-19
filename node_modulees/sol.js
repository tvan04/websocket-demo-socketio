import http from 'http';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';

// Define the port for the HTTP server
const port = 3000;

// Create a simple HTTP server to serve static files
const server = http.createServer((req, res) => {
  // Determine the file to serve. If no file is specified, serve client.html
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './client.html';
  }

  // Map file extensions to MIME types
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`HTTP server is running on http://localhost:${port}`);
});

// Attach a WebSocket server to the HTTP server
const wss = new WebSocketServer({ server });

// Global counter to assign unique usernames
let userCount = 0;

wss.on('connection', (ws) => {
  // Assign a unique username to the connecting client
  userCount++;
  ws.username = `User ${userCount}`;
  console.log(`${ws.username} connected!`);

  // Notify the new user of their username
  ws.send(`Welcome, ${ws.username}!`);

  ws.on('message', (data) => {
    console.log(`${ws.username} sent: ${data}`);
    
    // Broadcast the message to all connected clients with the sender's name
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === client.OPEN) {
        // Each client receives a message formatted as "User X: message"
        client.send(`${ws.username}: ${data}`);
      }
    });
  });

  ws.on('close', () => {
    console.log(`${ws.username} disconnected`);
  });
});
