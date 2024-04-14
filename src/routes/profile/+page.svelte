<script lang="ts">
  import {pb, user} from '$lib/pocketbase';
  import Navbar from '$lib/components/Navbar.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { Label } from "$lib/components/ui/label";
  import dayjs from 'dayjs';
  import { goto } from '$app/navigation';

  let name:string = $user?.username;
  let smokes:number = $user?.smokes || 0;
  $: console.log(name);
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
	import Button from '$lib/components/ui/button/button.svelte';
 
  let value = today(getLocalTimeZone());

  async function handleSubmit(){
    console.log(dayjs(value).format("YYYY-MM-DD"));
    const data = {
    "username": name,
    "lastError": dayjs(value).format("YYYY-MM-DD"),
    "smokes": smokes
    };

  const record = await pb.collection('users').update($user?.id, data);
  }

  function signOut(){
    pb.authStore.clear();
    goto("/");
  }
</script>


<div class="w-full flex flex-col px-4 gap-16 pt-16">
  <div class="flex flex-col border-b-2 pb-8 -mb-4">
    <div class="font-bold text-3xl gradient-text">
      Profile
    </div>
    <div class="text-md">
      Edit your profile and make sure it's all up to date!
    </div>
  </div>
  
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-4">
      <Label for="name" class="whitespace-nowrap">Your name</Label>
      <Input bind:name placeholder={$user?.username}></Input>
    </div>
    <div class="flex items-center gap-4">
      <Label for="number" class="whitespace-nowrap">How many times do you smoke a day?</Label>
      <Input bind:value={smokes} type="number" placeholder=6></Input>
    </div>
    <div class="flex gap-4 flex-col">
      <Label for="number" class="whitespace-nowrap">When is the last time you smoked?</Label>
      <Calendar bind:value class="rounded-md border w-fit mx-auto" />
    </div>
    <Button on:click={()=>{handleSubmit()}}>
      Update Profile
    </Button>
    
  </div>

  <Button on:click={()=>{signOut()}} variant="destructive">
    Sign out
  </Button>

  <div class="h-16"></div>


</div>


<div class="sticky bottom-0">
  <Navbar text="Profile"/>
</div>

<style>
  @keyframes background-pan {
    from {
      background-position: 0% center;
    }

    to {
      background-position: -200% center;
    }
  }

  .gradient-text {
    animation: background-pan 8s linear infinite;
    --color-one: #296ba5;
    --color-two: #4676bd;
    --color-three: #80addd;
    --color-four: #7dc0ea;
    background-color: #f3ec78;
    background-image: linear-gradient(90deg, var(--color-one), var(--color-two), var(--color-three), var(--color-four), var(--color-one));
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
  }

</style>