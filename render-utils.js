export async function renderMessages(messages) {
    const messagesContainerEl = document.createElement('div');
    // const iconEl = document.createElement('img');
    const messageEl = document.createElement('p');
    const usernameEl = document.createElement('span');
    const textEl = document.createElement('span');

    messagesContainerEl.classList.add('message-container');
    // iconEl.classList.add('icon');
    usernameEl.classList.add('username');
    textEl.classList.add('message-text');
    console.log(messages);
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
    chatroomsContainerEl.classList.add('chatrooms-container');
    // iconEl.classList.add('icon');
    nameEl.textContent = chatrooms.name;
    chatroomsContainerEl.append(nameEl);
    console.log(nameEl, chatroomsContainerEl);
    return chatroomsContainerEl;
}