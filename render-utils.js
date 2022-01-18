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

    usernameEl.textContent = `${messages.profiles.username} said: `;
    textEl.textContent = messages.message;

    messageEl.append(usernameEl, textEl);
    messagesContainerEl.append(messageEl);

    return messagesContainerEl;
}