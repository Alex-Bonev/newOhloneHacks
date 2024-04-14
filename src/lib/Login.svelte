<script lang="ts">
  import { pb, user } from './pocketbase';
  import { goto } from '$app/navigation';

  let username: string;
  let password: string;

  async function login() {
    const user = await pb.collection('users').authWithPassword(username, password);
    console.log(user)
    goto("/profile")
  }
  import Button from './components/ui/button/button.svelte';
  import { Input } from "$lib/components/ui/input";

  async function signUp() {
    try {
      const data = {
        "username": username,
        "password": password,
        "passwordConfirm": password,
      };
      const createdUser = await pb.collection('users').create(data);
      await login();
    } catch (err) {
      console.error(err)
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

</script>

{#if $user}
  <p>
    Signed in as {$user.username} 
    <button on:click={signOut}>Sign Out</button>
  </p>
{:else}
  <form on:submit|preventDefault class="grid grid-cols-2 place-items-center gap-4">
    <Input
      placeholder="Username"
      type="text"
      bind:value={username}
    />

    <Input 
      placeholder="Password" 
      type="password" 
      bind:value={password} 
    />
    <Button on:click={signUp} variant="outline" class="w-full">Sign Up</Button>
    <Button on:click={login} class="w-full">Log In</Button>
  </form>
{/if}