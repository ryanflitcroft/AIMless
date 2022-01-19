import { checkAuth, createMessage, getUser, logout, getMessages, getSingleChatroom, client } from '../fetch-utils.js';
import { renderMessages } from '../render-utils.js';
checkAuth();

const form = document.querySelector('form');
const homeButton = document.querySelector('.home');
const chatboxListEl = document.querySelector('.chatbox-list');
const chatroomNameEl = document.querySelector('h2');
const logoutButton = document.getElementById('logout');
const params = new URLSearchParams(window.location.search);

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const message = data.get('message');

    const user = await getUser();

    const id = params.get('id');
    // const chat_id = await getSingleChatroom(id);

    await createMessage({
        message,
        user_id: user.user.id,
        chat_id: id
    });
    form.reset();
});

window.addEventListener('load', async() => {
    const id = params.get('id');
    await getMessages(id);
    const chatroom = await getSingleChatroom(id);
    chatroomNameEl.textContent = chatroom.name;


    displayMessages();

    await client
        .from('*')
        .on('*', async payload => {
            console.log('Change received!', payload);
            await displayMessages();
        })
        .subscribe();
});

async function displayMessages() {
    const id = params.get('id');
    const messages = await getMessages(id);
    console.log(messages);
    chatboxListEl.textContent = '';

    for (let message of messages) {
        const messagesEL = await renderMessages(message);
        chatboxListEl.append(messagesEL);
    }
}

homeButton.addEventListener('click', () => {
    window.location.href = '../chatrooms/';
});