<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import Navbar from "$lib/components/Navbar.svelte";
  import { Progress } from "$lib/components/ui/progress";
  import * as Card from "$lib/components/ui/card/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import Plus from "lucide-svelte/icons/plus"
  import ChevronUp from "lucide-svelte/icons/chevron-up"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Drawer from "$lib/components/ui/drawer";
  import { pb, user } from '$lib/pocketbase';
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
 
  let value = today(getLocalTimeZone());

  let days:number = 0;

  
  let timeUntilTomorrow = "";
  let percentDoneWithToday = 0;
  
  import dayjs from 'dayjs';
  const now = dayjs();

  // Calculate time until tomorrow

  // Calculate percentage done with today
  const startOfDay = now.startOf('day');
  const endOfDay = now.endOf('day');
  const totalTimeOfDay = endOfDay.diff(startOfDay);
  const timeElapsed = now.diff(startOfDay);
  let timeInHours = timeElapsed/3600000
  let timeInMinutes = timeElapsed/60000 - Math.trunc(timeInHours)*60
  percentDoneWithToday = (timeElapsed / totalTimeOfDay) * 100;

  function formatDuration(duration) {
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  async function handleSlip(){
    const record = await pb.collection('users').update($user?.id, {"lastError": now});
  }

  $: {
    if ($user?.lastError){
      days = now.diff(($user?.lastError), "day");
    }
  }

  $: days = now.diff(($user?.lastError), "day");

  console.log($user?.username);
  console.log($user?.lastError);
  console.log(now.diff(($user?.lastError), "day"));
</script>

<div class="w-full flex flex-col px-4 gap-16 pt-4">
  <div class="flex flex-col border-b-2 pb-4 -mb-4">
    <div class="font-bold text-3xl gradient-text">
      Dashboard
    </div>
    <div class="text-md">
      Get a nice overview of yourself
    </div>
  </div>
  <div>
    <div class="aspect-square bg-blue-300 rounded-full w-72 mx-auto grid place-items-center grid-rows-3 text-9xl font-bold text-white shadow-lg">
      <div class="text-lg -mb-8">You have gone</div>
      <div class=''>
        {#if days}
          {days} 
        {:else}
          0
        {/if}
      </div>
      <div class="text-lg -mt-8">
        days without smoking
      </div>
    </div>
  </div>
  <Card.Root class="shadow-md">
    <Card.Header>
      <Card.Title>Time Until Tomorrow:</Card.Title>
      <Card.Description>{24-Math.trunc(timeInHours)} hours and {60-Math.trunc(timeInMinutes)} minutes</Card.Description>
    </Card.Header>
    <Card.Content>
      <Progress value={percentDoneWithToday} class="shadow-lg"/>
    </Card.Content>
  </Card.Root>

  
  
  <!-- <div class="flex flex-col gap-4">
    <div class="font-bold text-md border-b-2">Installing the app late?</div>

    
    <Card.Root class="shadow-md">
      <Card.Header>
        <Card.Title>When did you last smoke?</Card.Title>
        <Calendar bind:value class="rounded-md border" />
      </Card.Header>
      
    </Card.Root>
  </div> -->

  
  
  <Card.Root class="shadow-md">
    <Card.Header>
      <Card.Title>Your personalized Roadmap</Card.Title>
      <Card.Description>Scroll here whenever you need help!</Card.Description>
    </Card.Header>
    <Card.Content>
      <ScrollArea class="h-[200px] w-full rounded-md border p-4">
        {#if $user?.smokes<=5}
          Cutting down on smoking is a great step towards quitting altogether. First, identify your triggers and try to avoid them. Find healthier ways to cope with stress or boredom, like go for a walk or practice deep breathing. Set a quit date and stick to it. Consider using nicotine replacement therapy or medication to help with cravings. Also, seek support from friends, family, or a support group. Remember, small steps lead to big changes.
        {:else if $user?.smokes<=15}
          Quitting smoking is a significant step towards better health. Here's a roadmap for you: 1. Identify Triggers: Figure out the situations that make you reach for a cigarette. Try to avoid these triggers or find healthy alternatives. 2. Talk to Others: Let the people around you who smoke know that you're trying to quit, so they can support you and avoid smoking around you if possible. 3. Set a Quit Date: Choose a day to quit and stick to it. Plan and prepare yourself mentally and physically for that day. 4. Build a Support System: Surround yourself with friends, family, or support groups who understand your journey and can offer encouragement and motivation. 5. Seek Professional Help: Consider reaching out to a counselor or healthcare professional who can provide personalized support and advice. 6. Replace the Habit: Find healthy distractions or substitutes for smoking, such as chewing gum, taking a walk, or deep breathing exercises. 7. Stay Persistent: Understand that it's a process, and setbacks may happen. Stay persistent and be kind to yourself throughout this journey. Remember, you are not alone in this journey. With the right support and determination, you can successfully quit smoking.
        {:else}
          Sure, quitting smoking can be a challenging journey, but it's definitely achievable with the right mindset and support. Here's a detailed roadmap to help you quit: 1. Set a Quit Date: Choose a specific date to quit smoking. This will give you time to prepare both mentally and physically. 2. Identify Triggers: Pay attention to the situations, emotions, and habits that trigger your smoking. This will help you prepare strategies to manage them. 3. Create a Quit Plan: List down your reasons for quitting, as well as the benefits you expect. Plan how you'll cope with cravings and withdrawal symptoms. 4. Seek Support: Let your friends, family, and coworkers know about your plan to quit. Having a support system can make a huge difference. 5. Nicotine Replacement Therapy (NRT): Consider using nicotine patches, gum, lozenges, or prescription medications to help manage cravings and withdrawal symptoms. 6. Avoid Triggers: Try to avoid situations and places that make you want to smoke, especially during the early days of quitting. 7. Find Alternatives: Identify healthy habits or activities to replace smoking, such as exercise, hobbies, or talking to a friend. 8. Cognitive Behavioral Therapy (CBT): Consider seeking professional help or joining a support group to learn coping strategies and behavior modification techniques. 9. Deal with Cravings: When a craving hits, distract yourself with deep breathing, drinking water, or chewing gum. Remind yourself of your reasons for quitting. 10. Stay Positive: Focus on the benefits of quitting, such as improved health, saving money, and being a positive role model for others. 11. Relapse Prevention: If you slip up, don't be too hard on yourself. Understand the triggers for the relapse, adjust your strategy, and get back on track. Remember, quitting smoking is a process, and everyone's journey is different. It's okay to seek professional help from a counselor or healthcare provider to navigate through the challenges. You can do this!
        {/if}

      </ScrollArea>
    </Card.Content>
  </Card.Root>
  
  <Button on:click={()=>{handleSlip()}} variant="destructive">
    I slipped up :/
  </Button>
  <div class="h-16">

  </div>
</div>

<div class="sticky bottom-0">
  <Navbar text="Dashboard"/>
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