const socket = io("https://dougs-real-time-chat-app.herokuapp.com/");

const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const cleanForm = document.getElementById("clean-container");
const cleanButton = document.getElementById("clean-button");

if (messageForm != null) {
  const userName = prompt("What is your name?");
  appendMessage("You joined the room");
  socket.emit("new-user", roomName, userName);

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}

if (cleanForm != null) {
  cleanButton.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("clear-rooms")
  })
}

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement("a")
  roomLink.href =  `/${room}`
  roomLink.innerText = 'Join: '
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (userName) => {
  appendMessage(`${userName} has connected`);
});

socket.on("user-disconnected", (userName) => {
  appendMessage(`${userName} has disconnected`);
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
