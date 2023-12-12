<script lang="ts">
  import type { LetterColorMap } from "../game";
  import type { WordColor } from "../guess";

  export let key: string;
  export let letterColorMap: LetterColorMap;
  export let clickHandler: ((key: string) => void) | (() => void);

  let cell: HTMLDivElement;

  $: color = letterColorMap[key.toLowerCase()] ?? "empty";

  // slightly different
  function convertColor(color: WordColor) {
    const map = {
      green: "#6aaa64",
      yellow: "#c9b458",
      gray: "#787c7e",
      empty: "lightgray",
      white: "#ffffff",
    };

    return map[color];
  }
</script>

<!-- NOTE: There is already a keyboard handler for these keys -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  style="--tile-color: {convertColor(color)};"
  class="cell {color === 'empty' ? 'border-light' : ''} {color === 'white'
    ? 'border-dark'
    : ''} {key === 'Enter' || key === 'Delete' ? 'small-text' : ''}"
  bind:this={cell}
  on:click={() => clickHandler(key)}
>
  {key.toUpperCase()}
</div>

<style>
  .cell {
    display: flex;
    width: 1.5em;
    height: 2em;
    text-align: center;
    line-height: 2em;
    font-size: 1.2em;
    font-weight: bold;
    margin: 2px;
    font-family: "Arial", sans-serif;
    color: white;
    vertical-align: middle;
    background-color: var(--tile-color);
    border-radius: 10%;
    justify-content: center;
    align-items: center;
  }

  .cell:hover {
    cursor: pointer;
  }

  .border-light {
    border: 1px solid #d3d6da;
    color: black;
  }

  .border-dark {
    transition: border-color 0.15s ease;
    border: 1px solid #6a737d;
    color: black;
  }

  .small-text {
    width: 4.4em;
    height: 2.8em;
    font-size: 0.8em;
  }
</style>
