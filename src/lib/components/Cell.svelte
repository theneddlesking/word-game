<script lang="ts">
  import type { WordColor } from "../guess";

  export let letter: string;
  export let color: WordColor;
  export let flipDelay: number;
  export let isWin = false;
  export let winDelay: number;

  let cell: HTMLDivElement;

  function convertColor(color: WordColor) {
    const map = {
      green: "#13560f",
      yellow: "#fd9b08",
      gray: "#000000",
      empty: "#ffffff",
      white: "#ffffff",
    };

    return isWin ? map["green"] : map[color];
  }
</script>

<div
  style="--tile-color: {convertColor(
    color
  )}; --flip-delay: {flipDelay}s; --win-delay: {winDelay}s"
  class="cell {color === 'empty' && !isWin ? 'border-light' : ''} {color ===
    'white' && !isWin
    ? 'border-dark'
    : ''} {color !== 'empty' && color !== 'white'
    ? 'border-light flip'
    : ''} {isWin ? 'win-animation' : ''}"
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

  .win-animation {
    background-color: var(--tile-color);
    color: white;
    animation: cellWinAnimation 0.5s ease-in-out;
    animation-delay: calc(var(--win-delay));
  }

  @keyframes cellWinAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
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
