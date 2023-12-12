<script lang="ts">
  import type { WordColors as WordColor } from "../guess";

  export let letter: string;
  export let color: WordColor;

  function convertColor(color: WordColor) {
    const map = {
      green: "#6aaa64",
      yellow: "#c9b458",
      gray: "#787c7e",
      empty: "#ffffff",
    };

    return map[color];
  }
</script>

<div
  class="cell {color === 'empty' ? 'border' : ''}"
  style="background-color: {convertColor(color)}"
>
  {letter.toUpperCase()}
</div>

<style>
  .cell {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 2px;
    font-family: "Arial", sans-serif;
    color: white;
    vertical-align: middle;
  }

  .border {
    border: 1px solid #d3d6da;
  }
</style>
