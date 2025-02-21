// Connect to the WebSocket server using the same host and port as the served page
const ws = new WebSocket(`ws://${window.location.host}`);

// Get DOM elements
const chat = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// When connection is open, inform the user
ws.onopen = () => {
  addMessage('Connected to the server', 'received');
};

// When a message is received, display it in the chat area
ws.onmessage = (event) => {
  addMessage(event.data, 'received');
};

// When the connection is closed, inform the user
ws.onclose = () => {
  addMessage('Disconnected from the server', 'received');
};

// Send the message on button click
sendButton.addEventListener('click', sendMessage);

// Also send message on pressing Enter
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    ws.send(message);
    addMessage(message, 'sent');
    messageInput.value = '';
  }
}

// Function to add a message element to the chat
function addMessage(message, type) {
  const msgElement = document.createElement('div');
  msgElement.classList.add('message', type);
  msgElement.textContent = message;
  chat.appendChild(msgElement);
  // Automatically scroll to the bottom of the chat
  chat.scrollTop = chat.scrollHeight;
}
