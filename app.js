import { redirect, signInUser, signUpUser } from './fetch-utils.js';

const signInForm = document.querySelector('#signIn-form');
const signUpForm = document.querySelector('#signUp-form');
const signUpLink = document.querySelector('#signup-link');
const signInLink = document.querySelector('#signin-link');
const signInSection = document.querySelector('#signIn-section');
const signUpSection = document.querySelector('#signUp-section');
console.log(signInForm,
    signUpForm,
    signUpLink,
    signInLink,
    signInSection,
    signUpSection);
signInForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(signInForm);
    
    const email = data.get('inEmail');
    const password = data.get('inPassword');
    // console.log(email, password);

    const user = await signInUser(email, password);

    if (user) signInForm.reset();
    else alert('Try that again!');

    if (user) {
        redirect();
    } else {
        console.error(user);
    }
});

signUpForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(signUpForm);
    const username = data.get('username');
    const email = data.get('upEmail');
    const password = data.get('upPassword');
    // const profile = { username, email };

    

    const user = await signUpUser(email, password, username);
    console.log(user);
   
    if (password.length < 6) {
        alert('Password must contain 6 or more characters.');
    }

    if (user) signUpForm.reset();

    if (user) {
        redirect();
    } else {
        console.error(user);
    }

});

signInLink.addEventListener('click', () => {
    signInSection.classList.remove('hidden');
    signUpSection.classList.add('hidden');
});

signUpLink.addEventListener('click', () => {
    signUpSection.classList.remove('hidden');
    signInSection.classList.add('hidden');
});