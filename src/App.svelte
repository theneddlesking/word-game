<script lang="ts">
  import Dialog from "./lib/components/Dialog.svelte";
  import Game from "./lib/components/Game.svelte";
  import Header from "./lib/components/Header.svelte";
  import HeaderButton from "./lib/components/HeaderButton.svelte";
  import { getUserData, type UserData } from "./lib/userData";

  let rulesDialogOpen = true;
  let statsDialogOpen = false;

  $: dialogIsOpen = rulesDialogOpen || statsDialogOpen;

  let rules =
    "each guess has one incorrect piece of information except if you guessed the word correctly.";

  let userData: UserData = getUserData();
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
  </p>
  <div>
    <!-- render each number of wins -->
  </div>
</Dialog>

<main class={dialogIsOpen ? "lowOpacity" : ""}>
  <Game bind:userData bind:dialogIsOpen bind:showStats={statsDialogOpen} />
</main>

<style>
  #buttons {
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px;
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
