<script lang="ts">
  import { onMount } from "svelte";
  import type WordGame from "../game";
  import type { GuessResponse } from "../game";
  import { addGameToUserData, saveUserData, type UserData } from "../userData";
  import Guess from "./Guess.svelte";
  import Keyboard from "./Keyboard.svelte";

  export let userData: UserData;
  export let showStats: boolean;
  export let dialogIsOpen: boolean;

  let isInputDisabled = false;

  let isShaking = false;
  let isWinAnimation = false;
  let showWord = false;

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

  // loads game from local storage or creates a new one
  export let game: WordGame;

  let letterColorMap = game.letterColorMap;

  function handleGameOver(response: GuessResponse) {
    // update user data
    userData = addGameToUserData(userData, game);

    // save user data
    saveUserData(userData);

    setTimeout(() => {
      if (response.gameWon) {
        // do the animation if you won
        isWinAnimation = true;

        // show stats screen
        setTimeout(() => {
          showStats = true;
        }, 2000);
      } else {
        // reveal the answer
        showWord = true;

        // show stats screen
        setTimeout(() => {
          showStats = true;
        }, 1000);
      }
    }, 2500);
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
    if (currentWord.length == game.wordLength && !dialogIsOpen) {
      const response = game.makeGuess(currentWord.toLowerCase());

      if (!response.invalidGuess) {
        disableInput();
        currentWord = "";
      }

      handleResponse(response);
    }
  }

  function tryDeletingLetter() {
    if (currentWord.length > 0 && !dialogIsOpen) {
      currentWord = currentWord.slice(0, -1);
    }
  }

  function tryAddingLetter(letter: string) {
    if (
      game.guesses.length == game.maxGuesses ||
      game.gameWon ||
      dialogIsOpen
    ) {
      return;
    }

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
  <div id="guesses">
    <!-- filled guess -->

    {#each game.guesses as guess, i}
      <!-- not last guess -->
      <Guess {guess} isWin={isWinAnimation && i == game.guesses.length - 1} />
    {/each}

    <!-- current guess -->
    {#if game.guesses.length != game.maxGuesses}
      <Guess guess={currentGuess} bind:isShaking />
    {/if}

    <!-- empty guesses -->
    {#each Array(Math.max(0, game.maxGuesses - game.guesses.length - 1)) as _}
      <Guess />
    {/each}
  </div>

  {#if showWord}
    <div id="answer">
      {game.answer}
    </div>
  {/if}

  <div id="keyboard-container">
    <Keyboard
      {letterColorMap}
      {tryAddingLetter}
      {tryDeletingLetter}
      tryGuessingWord={tryEnteringGuess}
    />
  </div>
</div>

<style>
  #game {
    padding: 8px;
    font-size: 1.2rem;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #answer {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    position: absolute;
    top: 15vh;
    background-color: white;
    border: 3px solid gray;
    padding: 5px;
    border-radius: 5px;
    left: calc(50vw - 40px);
  }
</style>
