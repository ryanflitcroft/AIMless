import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const form = document.querySelector('form');
const homeButton = document.querySelector('.home');
const chatboxListEl = document.querySelector('.chatbox-list');
const headEl = document.querySelector('.head');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('resize', () => {
    if (window.innerHeight > 565) {
        window.scrollTo(0, 0);
    }
});
