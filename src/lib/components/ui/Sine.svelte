<script lang="ts">
  import { onMount } from 'svelte';

  let step = -4;

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    draw(context);
  });

  function showAxes(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const xMin = 0;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";

    // X-Axis
    ctx.moveTo(xMin, height / 2);
    ctx.lineTo(width, height / 2);

    // Y-Axis
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);

    // Starting line
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);

    ctx.stroke();
  }

  function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const radius = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function plotSine(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const amplitude = 30;
    const frequency = 200;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(66,44,255)";

    let x = 4;
    let y = 0;

    while (x < width) {
      y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
      ctx.lineTo(x, y);
      x++;
    }
    ctx.stroke();
  }

  function draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, 500, 100);
    plotSine(context, step, 50);

    step += 4;
    window.requestAnimationFrame(() => draw(context));
  }
</script>

<div>
  <canvas id="canvas" width="400" height="100"></canvas>
</div>
