import { checkAuth, createMessage, getUser, logout, getMessages } from '../fetch-utils.js';
import { renderMessages } from '../render-utils.js';
checkAuth();

const form = document.querySelector('form');
const homeButton = document.querySelector('.home');
const chatboxListEl = document.querySelector('.chatbox-list');
const chatroomNameEl = document.querySelector('h2');
const params = new URLSearchParams(window.location.search);
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const message = data.get('message');

    const user = await getUser();
    console.log(user);

    await createMessage({
        message,
        user_id: user.user.id
    });
    form.reset();
});

window.addEventListener('load', async() => {
    const messages = await getMessages(1);
    chatroomNameEl.textContent = messages[0].chatrooms.name;
    console.log(messages);
    displayMessages();
});

async function displayMessages() {
    const messages = await getMessages(1);
    
    chatboxListEl.textContent = '';

    for (let message of messages) {
        const messagesEL = await renderMessages(message);
        chatboxListEl.append(messagesEL);
    }
}