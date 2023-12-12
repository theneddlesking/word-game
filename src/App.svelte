<script lang="ts">
  import Game from "./lib/components/Game.svelte";
  import Header from "./lib/components/Header.svelte";

  // try to load game from local storage
</script>

<Header />

<main>
  <Game />
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
