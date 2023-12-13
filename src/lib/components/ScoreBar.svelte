<script lang="ts">
  export let score: number;
  export let highest: number;
  export let count: number;

  let reductionFactor = highest < 4 ? 4 : 1;

  let percentage =
    highest === 0 ? 0 : (count / highest / reductionFactor) * 100;
</script>

<p id="label">{score}</p>

<div id="score-bar">
  <div id="score" style="width: {percentage}%"></div>
</div>

<style>
  #label {
    padding-left: 5px;
    font-size: 0.8rem;
    position: absolute;
  }

  #score-bar {
    width: 95%;
    height: 1em;
    overflow: hidden;
    margin: 1px;
    margin-left: 5%;
  }

  #score {
    height: 50%;
    background-color: gray;
    transition: width 0.5s ease-in-out;
  }
</style>
