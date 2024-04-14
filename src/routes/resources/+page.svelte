<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import Navbar from "$lib/components/Navbar.svelte";
  import { Progress } from "$lib/components/ui/progress";
  import * as Card from "$lib/components/ui/card/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import Plus from "lucide-svelte/icons/plus"
  import Book from "lucide-svelte/icons/book"
  import Brain from "lucide-svelte/icons/brain"
  import AreaChart from "lucide-svelte/icons/area-chart"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Drawer from "$lib/components/ui/drawer";
  import {pb, user} from "$lib/pocketbase"
  import {onMount} from "svelte";
  
  import dayjs from 'dayjs';
  const now = dayjs();

  let selection1:number = 0;
  let selection2:number = 0;
  let journalable:boolean = true;


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
              journalable = false; // Set x to false if a record with the same user ID is found
              break; // Exit the loop since we found a matching user ID
            }
          }
        }
    } else {
        // Handle the case where 'now' or 'userId' is invalid
        console.error('Invalid date or user ID.');
    }
    
  })

  async function handleJournal() {
    const data = {
      "user": $user?.id,
      "mood": selection1,
      "urge": selection2
    };
    const record = await pb.collection('journal').create(data);
    console.log('rahh')
  }
  $: journalable = journalable;
</script>

<div class="w-full flex flex-col px-4 gap-16 pt-16">
  <div class="flex flex-col border-b-2 pb-8 -mb-4">
    <div class="font-bold text-3xl gradient-text">
      Resources
    </div>
    <div class="text-md">
      Keep on track with some interactive tools
    </div>
  </div>
  
  <div class="flex flex-col gap-8">
    <Card.Root class="shadow-md">
      <Card.Header>
        <Card.Title>
          <div class="flex gap-4 items-center">
            <Book/>Daily Journal Entry
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Footer>
        <Drawer.Root>
          {#if journalable}
            <div class="w-full mx-auto">
              <Drawer.Trigger class={`${buttonVariants({ variant: "default" })} w-full`}>Log a Journal Entry</Drawer.Trigger>
            </div>
          {:else}
            <div class="w-full mx-auto">
              <Drawer.Trigger class={`${buttonVariants({ variant: "outline" })} w-full`}>Journal today done</Drawer.Trigger>
            </div>
          {/if}
          <Drawer.Content class="h-[30rem]">
            <Drawer.Header>
              <Drawer.Title>Log an entry for your Journal</Drawer.Title>
              <Drawer.Description>You can view past entries on the Journal page.</Drawer.Description>
            </Drawer.Header>
            <div class="flex flex-col px-8 pt-2 gap-2">
              <div class="flex justify-between"><div>Bad</div>
              <div class="font-bold text-md">How did you feel today?</div>
              <div>Good</div></div>
              <div class="flex w-full justify-between">
                <button on:click={()=>{selection1=1}} class={`${selection1==1?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-rose-500 to-rose-700 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection1=2}} class={`${selection1==2?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-rose-300 to-rose-500 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection1=3}} class={`${selection1==3?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-amber-300 to-amber-500 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection1=4}} class={`${selection1==4?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-emerald-300 to-emerald-500 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection1=5}} class={`${selection1==5?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-emerald-500 to-emerald-700 aspect-square w-16 rounded-full`}/>
              </div>
              <div class='h-8'></div>
              <div class="flex justify-between text-sm"><div>A Lot</div>
              <div class="font-bold text-sm">How strong was your urge to smoke?</div>
              <div>A little</div></div>
              <div class="flex w-full justify-between">
                <button on:click={()=>{selection2=5}} class={`${selection2==5?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-rose-500 to-rose-700 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection2=4}} class={`${selection2==4?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-rose-300 to-rose-500 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection2=3}} class={`${selection2==3?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-amber-300 to-amber-500 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection2=2}} class={`${selection2==2?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-emerald-300 to-emerald-500 aspect-square w-16 rounded-full`}/>
                <button on:click={()=>{selection2=1}} class={`${selection2==1?"scale-75":""} transition-transform duration-300 ease-in-out bg-gradient-to-br from-emerald-500 to-emerald-700 aspect-square w-16 rounded-full`}/>
              </div>
            </div>
            <Drawer.Footer>
              <Button on:click={()=>{handleJournal()}}>Submit</Button>
              <Drawer.Close>Cancel</Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      </Card.Footer>
    </Card.Root>
    
    <Card.Root class="shadow-md">
      <Card.Header>
        <Card.Title>
          <div class="flex gap-4 items-center">
            <Brain/>Speak to an AI Counselor!
          </div>
        </Card.Title>
        <Card.Description>Receive guidance from a virtual assistant!</Card.Description>
      </Card.Header>
      <Card.Footer>
        <a href="/counselor" class={`${buttonVariants({ variant: "default" })} w-full`}>Begin your conversation</a>
      </Card.Footer>
    </Card.Root>

    <Card.Root class="shadow-md">
      <Card.Header>
        <Card.Title>
          <div class="flex gap-4 items-center">
            <AreaChart/>Statistical Overview
          </div>
          </Card.Title>
        <Card.Description>Receive an in-depth analysis of your progress and your data here!</Card.Description>
      </Card.Header>
      <Card.Footer>
        <a href="/stats" class={`${buttonVariants({ variant: "default" })} w-full`}>Jump into the numbers!</a>
      </Card.Footer>
    </Card.Root>
  </div>


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