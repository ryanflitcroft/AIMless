import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const generalChatEl = document.querySelector('.general-chat');
const form = document.querySelector('form');
const chatroomsListEl = document.querySelector('.chatroom-list');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('resize', () => {
    if (window.innerHeight > 565) {
        window.scrollTo(0, 0);
    }
});

