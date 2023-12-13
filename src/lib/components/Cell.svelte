<script lang="ts">
  import type { WordColor } from "../guess";

  export let letter: string;
  export let color: WordColor;
  export let flipDelay: number;

  let cell: HTMLDivElement;

  function convertColor(color: WordColor) {
    const map = {
      green: "#13560f",
      yellow: "#fd9b08",
      gray: "#000000",
      empty: "#ffffff",
      white: "#ffffff",
    };

    return map[color];
  }
</script>

<div
  style="--tile-color: {convertColor(color)}; --flip-delay: {flipDelay}s;"
  class="test cell {color === 'empty' ? 'border-light' : ''} {color === 'white'
    ? 'border-dark'
    : ''} {color !== 'empty' && color !== 'white' ? 'border-light flip' : ''}"
  bind:this={cell}
>
  {letter.toUpperCase()}
</div>

<style>
  .cell {
    display: inline-block;
    width: 2em;
    height: 2em;
    text-align: center;
    line-height: 2em;
    font-size: 1.2em;
    font-weight: bold;
    margin: 2px;
    font-family: "Arial", sans-serif;
    color: white;
    vertical-align: middle;
  }

  .border-light {
    border: 1px solid rgb(204, 199, 199);
    color: black;
  }

  .border-dark {
    transition: border-color 0.15s ease;
    border: 1.5px solid #727a83;
    color: black;
    animation: pulse 0.2s;
  }

  .flip {
    animation: flipSequence 0.5s ease forwards;
    animation-delay: calc(var(--flip-delay));
  }

  .test {
    color: #13560f;
    color: #fd9b08;
    color: #000000;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
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
