<script lang="ts">
  export let handleClick: () => void;

  export let buttonText: string;
</script>

<button on:click={handleClick}>{buttonText}</button>
