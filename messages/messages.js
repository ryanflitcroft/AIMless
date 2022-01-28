import { SPECIAL_NUMBER, SCROLL_TOP } from '../constants.js';

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

window.addEventListener('load', async() => {
    const id = params.get('id');
    
    await getMessages(id);
    const chatroom = await getSingleChatroom(id);
    chatroomNameEl.textContent = chatroom.name;

    if (chatroom.id === SPECIAL_NUMBER) {
        chatbox.classList.add('hidden');
        chatContainer.style.height = '500px';
        chatboxListEl.style.height = '500px';
    }

    await displayMessages();

    await client
    //
        .from(`messages:chatroom_id=eq.${chatroom.id}`) // something like this (I might have gotten the names wrong) should keep the updates constrained to getting a refresh only when THIS chatroom's updates
        .on('*', async payload => {
            console.log('Change received!', payload);
            await displayMessages();
            chatboxListEl.scrollTop = SCROLL_TOP;
        })
        .subscribe();
    chatboxListEl.scrollTop = SCROLL_TOP;
});

homeButton.addEventListener('click', () => {
    window.location.href = '../chatrooms/';
});

createMessageForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const data = new FormData(createMessageForm);
    const message = data.get('message');
    
    const user = await getUser();
    
    const id = params.get('id');
    
    await createMessage({
        message,
        user_id: user.user.id,
        chat_id: id
    });
    createMessageForm.reset();
});

async function displayMessages() {
    const id = params.get('id');
    const messages = await getMessages(id);
    chatboxListEl.textContent = '';

    for (let message of messages) {
        const messagesEl = await renderMessages(message);
        const id = message.profiles.user_id;
        const user = await getUser();

        if (id === user.user.id) {
            messagesEl.classList.add('user-message');
        }

        chatboxListEl.append(messagesEl);

        let theme = message.chatrooms.theme;

        chatboxListEl.style.backgroundImage = `url(${theme})`;
        
        chatboxListEl.style.backgroundSize = 'cover';
    }
}