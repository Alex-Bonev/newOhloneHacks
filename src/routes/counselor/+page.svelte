<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { useCompletion } from 'ai/svelte';
  import {pb, user} from "$lib/pocketbase"
  import {onMount} from "svelte";
  import Navbar from "$lib/components/Navbar.svelte";

  const {
		input: promptInput,
		handleSubmit: handlePromptSubmit,
		completion: promptCompletion,
		isLoading: responseIsLoading
	} = useCompletion({ api: '/api/counselor' });
  
  let text:any;

  $: {
		if (!$responseIsLoading && $promptCompletion !== '') {
      // this is where i finalize the text value, but i could get rid of this
      text = $promptCompletion;
      console.log('all done!')
		}
	}

  // This gives us some juicy streaming text
  $: text = $promptCompletion;
  let message="";

  function handleRespond(text:string){
    message=text;
    const syntheticEvent = new Event('submit');
    let prompt = text;
    $promptInput = prompt;
    handlePromptSubmit(syntheticEvent);
  }

  let query:string = "";
</script>

<div class="w-full flex flex-col px-4 justify-between pt-16 h-screen">
  <div class="flex flex-col gap-16">
    <div class="flex flex-col border-b-2 pb-8 -mb-4">
      <div class="font-bold text-3xl gradient-text">
        Virtual Counselor
      </div>
      <div class="text-md">
        Engage in human-like discussion to gain some directive!
      </div>
    </div>
    <div class="flex flex-col">
      <div class="grid place-items-end text-blue-600">{$user?.username}</div>
      <div class="p-2 bg-blue-300 rounded-xl rounded-br-none shadow-md border-2 border-blue-400 ml-8">
        {#if message}
        {message}
        {:else}
        <div></div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col">
      <div class="grid place-items-start text-neutral-600">Virtual Counselor</div>
      <div class="p-2 bg-neutral-200 rounded-xl rounded-bl-none shadow-md border-2 border-neutral-300 mr-8">
        {#if text}
          {text}
        {:else}
          Hello {$user?.username}! I am an AI counselor, designed to provide you with guidance and actionable steps, feel free to tell me anything!
        {/if}
      </div>
  </div>
  </div>



  <form on:submit|preventDefault class="flex gap-4 mb-24">
      <Input
        placeholder="What's troubling you?"
        type="text"
        bind:value={query}
        class="flex-1"
      />
      <Button on:click={()=>{handleRespond(query)}} class="">Send</Button>
  </form>
  
 


</div>

<Navbar text="Resources"/>

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