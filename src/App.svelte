<script lang="ts">
  import Game from "./lib/components/Game.svelte";
  import Header from "./lib/components/Header.svelte";
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
    height: 100%;
  }
</style>
