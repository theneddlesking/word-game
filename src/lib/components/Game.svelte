<script lang="ts">
  import { onMount } from "svelte";
  import type { GuessResponse } from "../game";
  import { ORIGINAL } from "../original";
  import Guess from "./Guess.svelte";

  let currentWord = "";

  $: currentColors = Array.from(currentWord.padEnd(5, " ")).map((letter) =>
    letter === " " ? "empty" : "gray"
  );

  $: currentGuess = {
    word: currentWord.padEnd(5, " "),
    details: {
      colors: currentColors,
    },
  };

  let game = ORIGINAL;

  function handleGameOver(response: GuessResponse) {
    if (response.gameWon) {
      console.log("You won!");
    } else {
      console.log("You lost!");
    }
  }

  function handleInvalidGuess(response: GuessResponse) {
    console.log("Invalid guess");
  }

  function handleResponse(response: GuessResponse) {
    // invalid guess
    if (response.invalidGuess) {
      handleInvalidGuess(response);
    }

    // game ends
    if (response.gameOver) {
      handleGameOver(response);
    }

    // update the game state
    game = game;
  }

  function tryEnteringGuess() {
    if (currentWord.length == ORIGINAL.wordLength) {
      const response = ORIGINAL.makeGuess(currentWord.toLowerCase());
      currentWord = "";
      handleResponse(response);
    }
  }

  function tryDeletingLetter() {
    if (currentWord.length > 0) {
      currentWord = currentWord.slice(0, -1);
    }
  }

  function tryAddingLetter(letter: string) {
    if (/^[A-Z]$/.test(letter) && currentWord.length < ORIGINAL.wordLength) {
      currentWord += letter;
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

    if (game.guesses.length == game.maxGuesses || game.gameWon) {
      return;
    }

    tryAddingLetter(key);
  }

  // listen for key inputs
  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
</script>

<h1>Game</h1>

<div id="game">
  <!-- filled guess -->
  {#each game.guesses as guess}
    <Guess {guess} />
  {/each}

  <!-- current guess -->
  {#if game.guesses.length != game.maxGuesses}
    <Guess guess={currentGuess} />
  {/if}

  <!-- empty guesses -->
  {#each Array(Math.max(0, game.maxGuesses - game.guesses.length - 1)) as _}
    <Guess />
  {/each}
</div>

<style>
</style>
