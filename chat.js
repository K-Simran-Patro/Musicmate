function getParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const receiverId = parseInt(urlParams.get('receiverId'));
    const senderId = parseInt(urlParams.get('senderId'));
    const username = urlParams.get('username');
    const senderName = urlParams.get('senderName');
    return { receiverId, username, senderId,senderName};
}

// const senderId = 1; // Example sender
// const receiverId = 2; // Example receiver

// Get parameters when chat.html loads
const { receiverId, username ,senderId,senderName} = getParamsFromURL();
// console.log('Receiver ID:', receiverId); // Debugging log
// console.log('Username:', username); // Debugging log
// console.log('senderId:', senderId);
// console.log('senderName:', senderName);


const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

// Load chat messages when the page loads
window.onload = loadMessages;

function loadMessages() {
    fetch(`api/load_chat.php?sender_id=${senderId}&receiver_id=${receiverId}`)
        .then(response => response.json())
        .then(data => {
            chatBox.innerHTML = '';
            data.forEach(msg => {
                console.log('msg_senderId:', msg.sender_id);
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message');
                messageElement.innerHTML = `<span class="sender">${msg.sender_id === senderId ? senderName : username}:</span> ${msg.message}`;
                chatBox.appendChild(messageElement);
            });
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => console.error('Error loading messages:', error));
}

sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        fetch('api/send_message.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId, message })
        })
        .then(response => response.json())
        .then(() => {
            messageInput.value = '';
            loadMessages();
        })
        .catch(error => console.error('Error sending message:', error));
    }
});
