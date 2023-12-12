<script lang="ts">
  import { ORIGINAL } from "../original";

  let guess = "";

  console.log(ORIGINAL);
</script>

<h1>Game</h1>

<input type="text" bind:value={guess} />

<button
  on:click={() => {
    console.log(guess);
    const response = ORIGINAL.makeGuess(guess);
    console.log(response);
  }}>Make Guess</button
>
