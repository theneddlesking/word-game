<script lang="ts">
  import { onMount } from "svelte";
  import { VALID_ANSWERS } from "../answers";
  import type { GuessResponse } from "../game";
  import { ORIGINAL_VALIDATION_FUNC } from "../games/original";
  import { getGame } from "../getGame";
  import Guess from "./Guess.svelte";
  import Keyboard from "./Keyboard.svelte";

  let isInputDisabled = false;

  let isShaking = false;

  function disableInput(delay = 1500) {
    isInputDisabled = true;
    setTimeout(() => {
      isInputDisabled = false;

      // only update color map after the guess is made
      letterColorMap = game.letterColorMap;
    }, delay);
  }

  let currentWord = "";

  $: currentColors = Array.from(currentWord.padEnd(5, " ")).map((letter) =>
    letter === " " ? "empty" : "white"
  );

  $: currentGuess = {
    word: currentWord.padEnd(5, " "),
    details: {
      colors: currentColors,
    },
  };

  let game = getGame(VALID_ANSWERS[0], ORIGINAL_VALIDATION_FUNC);

  let letterColorMap = game.letterColorMap;

  function handleGameOver(response: GuessResponse) {
    if (response.gameWon) {
      console.log("You won!");
    } else {
      console.log("You lost!");
    }
  }

  let timeout: ReturnType<typeof setTimeout> | undefined;
  function handleInvalidGuess(response: GuessResponse) {
    isShaking = true;

    disableInput(750);

    if (!timeout) {
      timeout = setTimeout(() => {
        isShaking = false;
        timeout = undefined;
      }, 1500);
    }
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

    // save to local storage
    localStorage.setItem("game", JSON.stringify(game));
  }

  function tryEnteringGuess() {
    if (currentWord.length == game.wordLength) {
      const response = game.makeGuess(currentWord.toLowerCase());

      if (!response.invalidGuess) {
        disableInput();
        currentWord = "";
      }

      handleResponse(response);
    }
  }

  function tryDeletingLetter() {
    if (currentWord.length > 0) {
      currentWord = currentWord.slice(0, -1);
    }
  }

  function tryAddingLetter(letter: string) {
    if (
      /^[A-Z]$/.test(letter) &&
      currentWord.length < game.wordLength &&
      !isInputDisabled
    ) {
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

    if (game.guesses.length == game.maxGuesses || game.gameWon) {
      return;
    }

    tryAddingLetter(key);
  }

  function handleKeyUp(event: KeyboardEvent) {
    const key = event.key.toUpperCase();

    if (isInputDisabled) {
      return;
    }

    if (key != "ENTER") {
      return;
    }

    if (game.guesses.length == game.maxGuesses || game.gameWon) {
      return;
    }

    tryEnteringGuess();
  }

  // listen for key inputs
  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  });
</script>

<div id="game">
  <!-- filled guess -->
  {#each game.guesses as guess}
    <Guess {guess} />
  {/each}

  <!-- current guess -->
  {#if game.guesses.length != game.maxGuesses}
    <Guess guess={currentGuess} bind:isShaking />
  {/if}

  <!-- empty guesses -->
  {#each Array(Math.max(0, game.maxGuesses - game.guesses.length - 1)) as _}
    <Guess />
  {/each}

  <Keyboard
    {letterColorMap}
    {tryAddingLetter}
    {tryDeletingLetter}
    tryGuessingWord={tryEnteringGuess}
  />
</div>

<style>
  #game {
    padding: 8px;
    font-size: 1.2rem;
  }
</style>
