<script lang="ts">
  import type Guess from "../guess";
  import Cell from "./Cell.svelte";

  export let guess: Guess = {
    word: "     ",
    details: {
      colors: ["empty", "empty", "empty", "empty", "empty"],
    },
  };

  export let isWin: boolean = false;

  export let isShaking: boolean = false;

  $: if (isShaking) {
    const element = document.getElementById("guess-container");
    if (element) {
      element.addEventListener("animationend", () => {
        isShaking = false;
      });
    }
  }
</script>

<div id="guess-container" class:shake={isShaking}>
  {#each guess.word as letter, i}
    <Cell
      {letter}
      color={guess.details.colors[i]}
      flipDelay={i * 0.25}
      {isWin}
      winDelay={i * 0.15}
    />
  {/each}
</div>

<style>
  #guess-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shake {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25%,
    75% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
  }
</style>
