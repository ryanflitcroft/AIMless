import { checkAuth, logout, getUser, createMessage, getChatrooms } from '../fetch-utils.js';
import { renderChatrooms } from '../render-utils.js';
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

async function displayChatrooms() {
    const chatrooms = await getChatrooms();

    chatroomsListEl.textContent = '';

    for (let chatroom of chatrooms) {
        const chatroomEl = await renderChatrooms(chatroom);
        chatroomsListEl.append(chatroomEl);

        
    }
}