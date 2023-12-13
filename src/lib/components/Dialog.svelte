<script lang="ts">
  export let isOpen: boolean = false;
  export let heading: string;
</script>

<dialog open={isOpen}>
  <h1>{heading}</h1>
  <button on:click={() => (isOpen = !isOpen)}>Close</button>
  <slot />
</dialog>

<style>
  dialog {
    position: absolute;
    top: 25vh;
    left: calc(50vw - 150px);
    width: 300px;
    z-index: 100;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
  }

  h1 {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
  }
</style>
