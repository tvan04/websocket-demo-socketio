document.addEventListener('DOMContentLoaded', () => {
  const socket = io(); // Connect to the server

  const chat = document.getElementById('chat');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');

  // When connected, inform the user
  socket.on('connect', () => {
    addMessage('Connected to the server', 'received');
  });

  
  // TODO: When a message is received from the server, display it in the chat area
  // hint: use socket.io to get the message and use the addMessage function to display it
  // hinthint: 'send' and 'received' dictates which messages display on the left or right side of the chat box for addMessage type parameter
  // {Add Code Here}


  // When the connection is closed, inform the user
  socket.on('disconnect', () => {
    addMessage('Disconnected from the server', 'received');
  });

  // Send the message on button click
  sendButton.addEventListener('click', sendMessage);

  // Also send the message on pressing Enter
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      //TODO: Send messages to the server
      //add one line below this comment to send the message to the server
      addMessage(`You: ${message}`, 'sent');
      messageInput.value = '';
    }
  }

  //helper function to add message to the chat 
  function addMessage(message, type) {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', type);
    msgElement.textContent = message;
    chat.appendChild(msgElement);
    chat.scrollTop = chat.scrollHeight;
  }
});