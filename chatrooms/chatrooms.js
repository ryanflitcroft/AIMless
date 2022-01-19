import { checkAuth, logout, getUser, createMessage, getChatrooms, getMessages, client } from '../fetch-utils.js';
import { renderChatrooms, renderMessages } from '../render-utils.js';
checkAuth();

const generalChatEl = document.querySelector('.general-chat');
const form = document.querySelector('form');
const chatroomsListEl = document.querySelector('.chatroom-list');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    
    await displayChatrooms();
    
    await displayGeneralChat();

    await client
        .from('*')
        .on('*', async payload => {
            console.log('Change received!', payload);
            await displayGeneralChat();
        })
        .subscribe();
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
        if (chatroom.id !== 1) {
            const chatroomEl = await renderChatrooms(chatroom);
            chatroomsListEl.append(chatroomEl);
        }
        
    }
}

async function displayGeneralChat() {
    const messages = await getMessages(1);

    const lastMessages = messages.slice(-2);

    generalChatEl.textContent = '';

    for (let message of lastMessages) {

        const messagesEl = await renderMessages(message);

        generalChatEl.append(messagesEl);
    }
}