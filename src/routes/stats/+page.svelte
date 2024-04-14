<script lang="ts">
  import { onMount } from "svelte";
  import {pb, user} from "$lib/pocketbase";
  import Navbar from "$lib/components/Navbar.svelte";
	import { RecordService } from "pocketbase";
  import * as Card from "$lib/components/ui/card/index.js";
  import MoodChart from "$lib/components/MoodChart.svelte";
  import UrgeChart from "$lib/components/UrgeChart.svelte";

  
  let entries:any[] = [];
  let moodsum = 0;
  let moodavg = 0;
  $: moodavg = moodsum/entries.length;

  let urgesum = 0;
  let urgeavg = 0;
  $: urgeavg = urgesum/entries.length;

  onMount(async ()=>{
    const now = new Date().toISOString().split('T')[0];

    // Assuming $user is a valid object containing the user's ID
    const userId = $user ? $user.id : null;

    // Check if both 'now' and 'userId' are valid before making the query
    if (now && userId) {
        const records = await pb.collection('journal').getFullList({
            filter: `created >= '${now}'`,
        });
        console.log(records);
        if (records.length > 0){
          for (const record of records) {
            if (record.user ===userId) {
              entries.push(record);
              console.log(record)
            }
          }
        }
    } else {
        // Handle the case where 'now' or 'userId' is invalid
        console.error('Invalid date or user ID.');
    }
    entries = entries;

    for (let entry of entries) {
      moodsum+=entry.mood;
      urgesum+=entry.urge;
    }
    
  })

  import dayjs from 'dayjs';
	import { browser } from "$app/environment";
  const now = dayjs().add(1, "day");
  let age = now.diff($user?.created, "day");
  let view=2;
  $: entries=entries;
</script>

<div class="w-full flex flex-col px-4 gap-16 pt-16">
  <div class="flex flex-col border-b-2 pb-8 -mb-4">
    <div class="font-bold text-3xl gradient-text">
      Statistics
    </div>
    <div class="text-md">
      Get a solid grip on where you're at, and your general progress!
    </div>
  </div>
  
  <div class="flex flex-col gap-8">
    <Card.Root class="shadow-md">
      <Card.Header>
        <Card.Title class="border-b-2 pb-2 border-neutral-300">Journal entries submitted: {entries.length}</Card.Title>
        <Card.Description>Thats <span class="font-bold text-neutral-800">{(entries.length/age)*100}%</span> of the days you've had an account!!</Card.Description>
      </Card.Header>
    </Card.Root>
    
    <Card.Root class="shadow-md">
      <Card.Header>
        <Card.Title class="border-b-2 pb-2 border-neutral-300">
          {#if moodavg}
            Your average mood: {Math.round(moodavg * 100) / 100}
          {:else}
            Submit a journal to see your actual stats!
          {/if}
        </Card.Title>
        <Card.Description class="text-md text-neutral-500">
          {#if moodavg>=4}
            <span class="">
              Seems like you've been in good spirits! Your score indicates a <span class="font-bold text-neutral-800">positive</span> mood, keep it up!
            </span>
            {:else if moodavg >=3}
            <span>
              <span class="font-bold text-neutral-800">You're feeling alright!</span> Nothing crazy, but nothing bad either. Keep it up, and stick with the process! More good awaits you in the future!
            </span>
            {:else if moodavg >=2}
            <span>
              <span class="font-bold text-neutral-800">It's not your best hour, but it's not your worst!</span> You could definitely be doing better, but there's always hope and potential on the horizon! Keep it up!
            </span>
            {:else}
            <span>
              <span class="font-bold text-neutral-800">You haven't been feeling well,</span> and that's okay. You're going through a very difficult process in your life, and it could never be expected to be easy. Nevertheless, you're here, and you're perservering. Keep it up, things will get better soon!
            </span>
          {/if}
          
        </Card.Description>
      </Card.Header>
    </Card.Root>
    
    <Card.Root class="shadow-md">
      <Card.Header>
        <Card.Title class="border-b-2 pb-2 border-neutral-300">
          {#if urgeavg}
            Your average urge: {Math.round(urgeavg * 100) / 100}
          {:else}
            Submit a journal to see your actual stats!
          {/if}
        </Card.Title>
        <Card.Description>
          {#if urgeavg>=4}
            <span>
              <span class="font-bold text-neutral-800">You're having a tough time out there.</span> The urge must be very strong, but power through it! Reach out to some friends, text the virtual counselor, eat some candy even! Keep up the efforts, and you'll see improvement.
            </span>
            {:else if urgeavg >=3}
            <span>
              <span class="font-bold text-neutral-800">It's been tough for you, but you're sticking it out!</span> Keep up the good work and high efforts, and you'll see even further improvements and change! You're on the right track, keep it up!
            </span>
            {:else if urgeavg >=2}
            <span>
              <span class="font-bold text-neutral-800">You're doing a great job!</span> Of course you could be doing even better, but look at where you are after where you used to be! It's a great improvement. Keep it up!
            </span>
            {:else}
            <span>
              Good going! <span class="font-bold text-neutral-800">You might as well be smoke-free!</span> It's all a mental game, and you are winning it right now! Keep up the good work!
            </span>
          {/if}
        </Card.Description>
      </Card.Header>
    </Card.Root>

    <MoodChart entries={entries}/>

  </div>


</div>

<div class="sticky bottom-0">
  <Navbar text="Resources"/>
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