import { checkAuth, createMessage, getUser, getMessages, getSingleChatroom, client } from '../fetch-utils.js';
import { renderMessages } from '../render-utils.js';
checkAuth();

const createMessageForm = document.querySelector('#create-message');
const homeButton = document.querySelector('#home-button');
const chatboxListEl = document.querySelector('#chatbox-list');
const chatroomNameEl = document.querySelector('#chatroom-name');
const chatbox = document.querySelector('#chatbox');
const chatContainer = document.querySelector('#chat-container');
const params = new URLSearchParams(window.location.search);


createMessageForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(createMessageForm);
    const message = data.get('message');

    const user = await getUser();

    const id = params.get('id');
    // const chat_id = await getSingleChatroom(id);

    await createMessage({
        message,
        user_id: user.user.id,
        chat_id: id
    });
    createMessageForm.reset();
});

window.addEventListener('load', async() => {
    const id = params.get('id');
    
    await getMessages(id);
    const chatroom = await getSingleChatroom(id);
    chatroomNameEl.textContent = chatroom.name;

    if (chatroom.id === 7) {
        chatbox.classList.add('hidden');
        chatContainer.style.height = '500px';
        chatboxListEl.style.height = '500px';
    }

    await displayMessages();

    await client
        .from('*')
        .on('*', async payload => {
            console.log('Change received!', payload);
            await displayMessages();
            chatboxListEl.scrollTop = 100000;
        })
        .subscribe();
    chatboxListEl.scrollTop = 100000;
});

async function displayMessages() {
    const id = params.get('id');
    const messages = await getMessages(id);
    chatboxListEl.textContent = '';

    for (let message of messages) {
        const messagesEL = await renderMessages(message);
        chatboxListEl.append(messagesEL);
    }
}

homeButton.addEventListener('click', () => {
    window.location.href = '../chatrooms/';
});