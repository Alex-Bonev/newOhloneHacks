<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";
  import Button from "$lib/components/ui/button/button.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import Sine from "$lib/components/ui/Sine.svelte";
  
  import { pb, user } from '$lib/pocketbase';

  async function oAuth() {
		await pb.collection('users').authWithOAuth2({ provider: 'google' });
	}

  import Login from "$lib/Login.svelte";

</script>

<div class="w-full flex flex-col px-4 text-center pt-32 gap-32">
  <div class="flex flex-col gap-2">
    <div class="text-8xl font-bold gradient-text">
      Escape
    </div>
    <div class="text-xl font-bold text-blue-600">
      Break free from addiction with IYTC
    </div>
    <!-- <div class="text-sm italic -mt-2 text-blue-300">
      (This app is designed for mobile use)
    </div> -->
  </div>
  {#if !$user}
    <!-- <Button
      class="flex gap-2 text-md px-3"
      on:click={() => {
        oAuth();
      }}
    >
      Continue with Google
    </Button> -->
    <Login/>
  {:else}
    <a class={`${buttonVariants({ variant: "default" })} w-fit px-24 py-6 mx-auto`} href="/profile">
      <!-- <BookOpen /> -->
      Meet the new you
    </a>
	{/if}
  <div class="flex flex-col gap-2 text-start">
    <div class="text-2xl font-bold">
      What can <span class="gradient-text">Escape</span> offer you?
    </div>
    <Accordion.Root>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Personalized Roadmap Generation</Accordion.Trigger>
        <Accordion.Content>
          Escape will provide you with a specific Roadmap Depending on your position in your smoke-free journey
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>In-app 24/7 AI Counseling</Accordion.Trigger>
        <Accordion.Content>
          Escape comes with a built-in virtual counselor, accessible to you at all times at no cost. Simply ask a question and receive an informed, helpful response.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Progress tracking</Accordion.Trigger>
        <Accordion.Content>
          Escape will provide you with a dynamic and adaptable progress tracking system, along with personalized interpretations for your current state. Continue to log your progress through activities and actions, and see the benefits unfold.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
 


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