import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('https://baec-207-62-190-33.ngrok-free.app'); 
export const user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    user.set(pb.authStore.model);
});