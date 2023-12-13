<script lang="ts">
  import Dialog from "./lib/components/Dialog.svelte";
  import Game from "./lib/components/Game.svelte";
  import Header from "./lib/components/Header.svelte";
  import HeaderButton from "./lib/components/HeaderButton.svelte";
  import ScoreBar from "./lib/components/ScoreBar.svelte";
  import type WordGame from "./lib/game";
  import { getGameForToday } from "./lib/getGame";
  import { getUserData, type Score } from "./lib/userData";

  let userData = getUserData();
  let game: WordGame = getGameForToday();

  let gameOver = game.gameWon || game.guesses.length == game.maxGuesses;

  // type cast to boolean
  let rulesDialogOpen = !gameOver;
  let statsDialogOpen = gameOver;

  $: dialogIsOpen = rulesDialogOpen || statsDialogOpen;

  let rules = game.rules;

  function getScoreFrequencyMap(arr: Score[]) {
    const frequencyMap: Record<string, number> = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
    };

    arr.forEach((element: Score) => {
      frequencyMap[element.toString()] =
        (frequencyMap[element.toString()] || 0) + 1;
    });

    return frequencyMap;
  }

  function findMostCommonElement(frequencyMap: Record<string, number>) {
    let mostCommonElement = "";
    let maxFrequency = 0;

    for (const element in frequencyMap) {
      if (frequencyMap[element] > maxFrequency) {
        maxFrequency = frequencyMap[element];
        mostCommonElement = element;
      }
    }

    return mostCommonElement;
  }

  // update whenever dialog is opened
  $: frequencyMap = dialogIsOpen ? getScoreFrequencyMap(userData.scores) : {};
  $: mostCommonScore = parseInt(findMostCommonElement(frequencyMap)) || 0;
  $: scores = Object.keys(frequencyMap);
</script>

<Header />

<div id="buttons">
  <HeaderButton
    handleClick={() => {
      rulesDialogOpen = !rulesDialogOpen;
      statsDialogOpen = false;
    }}
    buttonText={"Rules"}
  />
  <HeaderButton
    handleClick={() => {
      statsDialogOpen = !statsDialogOpen;
      rulesDialogOpen = false;
    }}
    buttonText={"Stats"}
  />
</div>

<Dialog bind:isOpen={rulesDialogOpen} heading={"How to Play"}>
  <div id="rules">
    <p>
      The standard rules apply but with a twist. Each day of the week there is a
      new twist.
    </p>
    <br />
    <p>Today, {rules}</p>
    <br />
    <p>Good Luck!</p>
  </div>
</Dialog>
<Dialog bind:isOpen={statsDialogOpen} heading={"Stats"}>
  <p>
    <strong>Games Played</strong>
    {userData.played}
  </p>
  <p>
    <strong>Winrate</strong>
    {userData.winPercentage}%
  </p>
  <p>
    <strong>Current Streak 🔥</strong>
    {userData.currentStreak}
  </p>
  <p>
    <strong>Longest Streak 🔥</strong>
    {userData.longestStreak}
  </p>
  <p>
    <br />
    <strong>Scores</strong>

    {#each scores as score}
      <ScoreBar
        score={parseInt(score)}
        count={frequencyMap[score]}
        highest={mostCommonScore}
      />
    {/each}
  </p>
  <div>
    <!-- render each number of wins -->
  </div>
</Dialog>

<main class={dialogIsOpen ? "lowOpacity" : ""}>
  <Game
    bind:userData
    bind:dialogIsOpen
    bind:showStats={statsDialogOpen}
    bind:game
  />
</main>

<style>
  #buttons {
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px;
    color: black;
  }

  #rules {
    padding: 20px;
    line-height: 1.3;
  }

  strong {
    font-weight: bold;
  }
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
  }

  .lowOpacity {
    opacity: 0.2;
    background-color: grey;
  }
</style>
