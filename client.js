// Connect to the WebSocket server running on localhost at port 8080
const ws = new WebSocket('ws://localhost:8080');

// When connection is open, inform the user
ws.onopen = () => {
  addMessage('Connected to the server');
};

// When a message is received, display it
ws.onmessage = (event) => {
  addMessage('Server says: ' + event.data);
};

// When the connection is closed, inform the user
ws.onclose = () => {
  addMessage('Disconnected from the server');
};

// Send the message entered by the user when the button is clicked
document.getElementById('sendButton').addEventListener('click', () => {
  const input = document.getElementById('messageInput');
  const message = input.value;
  if (message.trim() !== '') {
    ws.send(message);
    addMessage('You sent: ' + message);
    input.value = '';
  }
});

// Helper function to display messages on the page
function addMessage(message) {
  const messagesDiv = document.getElementById('messages');
  const p = document.createElement('p');
  p.textContent = message;
  messagesDiv.appendChild(p);
}
