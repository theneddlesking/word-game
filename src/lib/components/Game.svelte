<script lang="ts">
  import { onMount } from "svelte";
  import { ORIGINAL } from "../original";

  let guess = "";

  function tryEnteringGuess() {
    if (guess.length == ORIGINAL.wordLength) {
      const response = ORIGINAL.makeGuess(guess.toLowerCase());
      console.log(response);
      guess = "";
    }
  }

  function tryDeletingLetter() {
    if (guess.length > 0) {
      guess = guess.slice(0, -1);
    }
  }

  function tryAddingLetter(letter: string) {
    if (/^[A-Z]$/.test(letter) && guess.length < ORIGINAL.wordLength) {
      guess += letter;
    }
  }

  // only works for PC need to add for mobile too
  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toUpperCase();

    if (key == "BACKSPACE") {
      tryDeletingLetter();
      return;
    }

    if (key == "ENTER") {
      tryEnteringGuess();
      return;
    }

    tryAddingLetter(key);
  }

  $: displayWord = guess.split("").join(" ");

  console.log(ORIGINAL);

  // listen for key inputs
  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
</script>

<h1>Game</h1>

<div id="wordContainer">{displayWord}</div>
