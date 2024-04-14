<script lang="ts">

  export let text:string = "";

</script>


<div class="absolute bottom-0 flex px-4 w-full bg-gradient-to-br from-neutral-100 to-neutral-200 border-neutral-300 p-2 rounded-t-xl border-2 justify-evenly text-neutral-800">
  <a href="/profile" class={`${text=="Profile" ? "bg-gradient-to-br from-blue-200 to-blue-300 font-bold border-blue-300 shadow-md text-blue-500" : "bg-neutral-50 shadow-md"} p-2 border-2 rounded-lg `}>
    Profile
  </a>
  <a href="/dashboard" class={`${text=="Dashboard" ? "bg-gradient-to-br from-blue-200 to-blue-300 font-bold border-blue-300 shadow-md text-blue-500" : "bg-neutral-50 shadow-md"} p-2 border-2 rounded-lg `}>
    Dashboard
  </a>
  <a href="/resources" class={`${text=="Resources" ? "bg-gradient-to-br from-blue-200 to-blue-300 font-bold border-blue-300 shadow-md text-blue-500" : "bg-neutral-50 shadow-md"} p-2 border-2 rounded-lg `}>
    Resources
  </a>
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
    --color-one: #134571;
    --color-two: #052a62;
    --color-three: #204265;
    --color-four: #0e3f5e;
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