<script lang="ts">
  import type { WordColors as WordColor } from "../guess";

  export let letter: string;
  export let color: WordColor;
  export let flipDelay: number;

  let cell: HTMLDivElement;

  function convertColor(color: WordColor) {
    const map = {
      green: "#6aaa64",
      yellow: "#c9b458",
      gray: "#787c7e",
      empty: "#ffffff",
      white: "#ffffff",
    };

    return map[color];
  }
</script>

<div
  style="--tile-color: {convertColor(color)}; --flip-delay: {flipDelay}s;"
  class="cell {color === 'empty' ? 'border-light' : ''} {color === 'white'
    ? 'border-dark'
    : ''} {color !== 'empty' && color !== 'white' ? 'border-light flip' : ''}"
  bind:this={cell}
>
  {letter.toUpperCase()}
</div>

<style>
  .cell {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 2px;
    font-family: "Arial", sans-serif;
    color: white;
    vertical-align: middle;
  }

  .border-light {
    border: 1px solid #d3d6da;
    color: black;
  }

  .border-dark {
    transition: border-color 0.15s ease;
    border: 1px solid #6a737d;
    color: black;
    animation: pulse 0.2s;
  }

  .flip {
    animation: flipSequence 0.5s ease forwards;
    animation-delay: calc(var(--flip-delay));
  }

  @keyframes flipSequence {
    0% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(0);
      background-color: white;
      border: none;
      color: black;
    }

    100% {
      transform: scaleY(1);
      background-color: var(--tile-color);
      border: none;
      color: white;
    }
  }
</style>
