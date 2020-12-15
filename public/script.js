const socket = io('http://localhost:3000')

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")

const userName = prompt("What is your name?")
appendMessage('You joined the room')
socket.emit('new-user', userName)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on("user-connected", (userName) => {
  appendMessage(`${userName} has connected`);
});

socket.on("user-disconnected", (userName) => {
  appendMessage(`${userName} has disconnected`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value 
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message) 
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}