const socket = io('http://localhost:3000')

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")

const userName = prompt("What is your name?")
appendMessage('You joined the room')
socket.emit('new-user', userName)

socket.on('chat-message', data => {
    appendMessage(data)
})

socket.on("user-connected", (userName) => {
  appendMessage(`${userName} has connected`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value 
    socket.emit('send-chat-message', message) 
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}