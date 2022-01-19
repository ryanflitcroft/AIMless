import { checkAuth, logout, getUser, createMessage, getChatrooms, getMessages } from '../fetch-utils.js';
import { renderChatrooms, renderMessages } from '../render-utils.js';
checkAuth();

const generalChatEl = document.querySelector('.general-chat');
const form = document.querySelector('form');
const chatroomsListEl = document.querySelector('.chatroom-list');
const logoutButton = document.getElementById('logout');
const params = new URLSearchParams(window.location.search);

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    
    await displayChatrooms();
    
    await displayGeneralChat();
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const message = data.get('message');

    const user = await getUser();

    // const id = params.get('id');

    await createMessage({
        message,
        user_id: user.user.id,
        chat_id: 1
    });

    form.reset();
});

async function displayChatrooms() {
    const chatrooms = await getChatrooms();

    chatroomsListEl.textContent = '';

    for (let chatroom of chatrooms) {
        const chatroomEl = await renderChatrooms(chatroom);
        chatroomsListEl.append(chatroomEl);

        
    }
}

async function displayGeneralChat() {
    const messages = await getMessages(1);

    for (let message of messages) {
        // const messageOne = message[0];
        // const messageTwo = message[1];

        const messagesEl = await renderMessages(message);

        generalChatEl.append(messagesEl);
    }
}