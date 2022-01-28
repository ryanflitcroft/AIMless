import { SPECIAL_NUMBER } from './constants.js';

export async function renderMessages(messages) {
    const messagesContainerEl = document.createElement('div');
    const iconEl = document.createElement('img');
    const messageEl = document.createElement('p');
    const usernameEl = document.createElement('span');
    const textEl = document.createElement('span');

    
    usernameEl.classList.add('username');

    iconEl.src = messages.profiles.icon;
    usernameEl.textContent = `${messages.profiles.username} said: `;

    textEl.textContent = messages.message;

    if (messages.chatrooms.id === SPECIAL_NUMBER) {

        iconEl.addEventListener('click', () => {
            window.location.href = `../messages/?id=${messages.profiles.chat_id}`;
        });
    } 

    messageEl.append(iconEl, usernameEl, textEl);
    messagesContainerEl.append(messageEl);
    
    return messagesContainerEl;
}

export async function renderChatrooms(chatrooms) {
    const chatroomsContainerEl = document.createElement('div');
    
    const nameEl = document.createElement('a');
    
    nameEl.href = `../messages/?id=${chatrooms.id}`;
    chatroomsContainerEl.classList.add('chat-names');

    nameEl.textContent = chatrooms.name;
    chatroomsContainerEl.append(nameEl);

    return chatroomsContainerEl;
}
