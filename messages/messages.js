import { checkAuth, createMessage, getUser, logout } from '../fetch-utils.js';

checkAuth();

const form = document.querySelector('form');
const homeButton = document.querySelector('.home');
const chatboxListEl = document.querySelector('.chatbox-list');
const headEl = document.querySelector('.head');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
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
});