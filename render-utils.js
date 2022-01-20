export async function renderMessages(messages) {
    const messagesContainerEl = document.createElement('div');
    // const iconEl = document.createElement('img');
    const messageEl = document.createElement('p');
    const usernameEl = document.createElement('span');
    const textEl = document.createElement('span');

    usernameEl.classList.add('username');

    usernameEl.textContent = `${messages.profiles.username} said: `;
    textEl.textContent = messages.message;

    messageEl.append(usernameEl, textEl);
    messagesContainerEl.append(messageEl);

    return messagesContainerEl;
}

export async function renderChatrooms(chatrooms) {
    const chatroomsContainerEl = document.createElement('div');
    // const iconEl = document.createElement('img');
    const nameEl = document.createElement('a');
    
    nameEl.href = `../messages/?id=${chatrooms.id}`;
    chatroomsContainerEl.classList.add('chat-names');

    nameEl.textContent = chatrooms.name;
    chatroomsContainerEl.append(nameEl);

    return chatroomsContainerEl;
}

export function updateLog(parentElement, string) {
    const p = document.createElement('p');
    p.textContent = `> ${string}`;
    parentElement.append(p);
    return parentElement.scrollTop = parentElement.scrollHeight;
}