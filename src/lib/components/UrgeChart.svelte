<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { pb, user } from "$lib/pocketbase";
  import * as Card from "$lib/components/ui/card/index.js";

  export let entries: any[] = [];

  onMount(() => {
    entries = entries;
    
    // Move data creation here
    const data = entries.map((e) => ({ time: e.created, count: e.urge }));

    let chart: any;
    const chartContainer = document.getElementById('chartContainer');
    chart = echarts.init(chartContainer);

    const xAxisData = data.map(item => item.time);
    const seriesData = data.map(item => item.count);

    const option = {
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        min: 0, // Minimum value on the y-axis
        max: 5, // Maximum value on the y-axis
        interval: 1, // Step size between ticks on the y-axis
      },
      series: [{
        type: 'line',
        areaStyle: {},
        data: seriesData,
      }],
    };

    chart.setOption(option);

    // Resize chart with window
    window.addEventListener('resize', () => {
      chart.resize();
    });

    // Clean up when component is destroyed
    return () => {
      chart.dispose();
    };
  });

</script>

  
  <style>
  #chartContainer {
      width: 100%;
      height: 400px;
  }
  </style>
  

  <Card.Root class="shadow-md">
    <Card.Header>
      <Card.Title class="border-b-2 pb-2 border-neutral-300 -mb-32">Your urge to smoke over time</Card.Title>
    </Card.Header>
    <Card.Content>
      <div id="chartContainer"></div>
    </Card.Content>
  </Card.Root>