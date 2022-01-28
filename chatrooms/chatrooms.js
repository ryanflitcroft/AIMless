import { checkAuth, logout, getUser, createMessage, getChatrooms, getMessages, client } from '../fetch-utils.js';
import { renderChatrooms, renderMessages } from '../render-utils.js';
import { OTHER_SCROLL_TOP, GENERAL_CHAT_ID } from '../constants.js';
checkAuth();

const generalChatEl = document.querySelector('#general-chat');
const createMessageForm = document.querySelector('#create-message');
const chatroomsListEl = document.querySelector('#chatroom-list');
const logoutButton = document.querySelector('#logout');


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    
    await displayChatrooms();
    
    await displayGeneralChat();

    await client
        .from('*') // seems like with some tinkering you could contrain the changes as in messages.js. something like: .from(`messages:chatroom_id=eq.${chatroom.id}`), but you'll need to figure out what changes you want to watch for
        .on('*', async payload => {
            console.log('Change received!', payload);
            await displayGeneralChat();
            generalChatEl.scrollTop = OTHER_SCROLL_TOP;
        })
        .subscribe();
    generalChatEl.scrollTop = OTHER_SCROLL_TOP;
});

createMessageForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(createMessageForm);
    const message = data.get('message');

    const user = await getUser();

    await createMessage({
        message,
        user_id: user.user.id,
        chat_id: 1
    });

    createMessageForm.reset();
});

async function displayChatrooms() {
    const chatrooms = await getChatrooms();

    chatroomsListEl.textContent = '';

    for (let chatroom of chatrooms) {
        if (chatroom.id !== GENERAL_CHAT_ID) {
            const chatroomEl = await renderChatrooms(chatroom);
            chatroomsListEl.append(chatroomEl);
        }
        
    }
}

async function displayGeneralChat() {
    const messages = await getMessages(GENERAL_CHAT_ID);

    const lastMessages = messages.slice(-2);

    generalChatEl.textContent = '';

    for (let message of lastMessages) {

        const messagesEl = await renderMessages(message);
        const id = message.profiles.user_id;
        const user = await getUser();

        if (id === user.user.id) {
            messagesEl.classList.add('user-message');
        }

        generalChatEl.append(messagesEl);
    }
}