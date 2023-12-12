<script lang="ts">
  import type Guess from "../guess";
  import Cell from "./Cell.svelte";

  export let guess: Guess = {
    word: "     ",
    details: {
      colors: ["empty", "empty", "empty", "empty", "empty"],
    },
  };
</script>

<div>
  {#each guess.word as letter, i}
    <Cell {letter} color={guess.details.colors[i]} />
  {/each}
</div>
