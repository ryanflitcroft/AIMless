import { redirect, signInUser, signUpUser } from './fetch-utils.js';

const signInForm = document.querySelector('#signIn-form');
const signUpForm = document.querySelector('#signUp-form');

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

    const email = data.get('upEmail');
    const password = data.get('upPassword');

    if (password.length < 6) {
        alert('Password must contain 6 or more characters.');
    }

    const user = await signUpUser(email, password);

    if (user) signUpForm.reset();

    if (user) {
        redirect();
    } else {
        console.error(user);
    }

});
