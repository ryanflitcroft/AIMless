const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTgyMTEwLCJleHAiOjE5NTc3NTgxMTB9.ln0XaQwacMTteT-Rh-2-890eq4DDQENjr-1ULkws2z4';

const SUPABASE_URL = 'https://qdlvsbomvbacsxpxzrim.supabase.co';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);



export async function getUser() {
    return client.auth.session();
}

export async function getMessages(chat_id) {
    const response = await client
        .from('messages')
        .select(`*, 
        profiles (*),
        chatrooms (*)`)
        .match({ chat_id });
        
    return checkError(response);
}

export async function getChatrooms() {
    const response = await client
        .from('chatrooms')
        .select();
    return checkError(response);
}

export async function getSingleChatroom(id) {
    const response = await client
        .from('chatrooms')
        .select()
        .match({ id })
        .single();
    return checkError(response);
}

async function createProfile(username, email) {
    const response = await client
        .from('profiles')
        .insert([{ username, email }]); 
    return checkError(response);
}

export async function createMessage(message){
    const response = await client
        .from('messages')
        .insert(message);

    return checkError(response);
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirect() {
    if (await getUser()) {
        location.replace('./chatrooms');
    }
}

export async function signUpUser(email, password, username){
    const response = await client.auth.signUp({ email, password });
    await createProfile(username, email);
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

