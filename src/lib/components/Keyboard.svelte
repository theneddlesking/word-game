<script lang="ts">
  import type { LetterColorMap } from "../game";
  import Key from "./Key.svelte";
  import KeyRow from "./KeyRow.svelte";

  export let letterColorMap: LetterColorMap;
  export let tryAddingLetter: (letter: string) => void;
  export let tryDeletingLetter: () => void;
  export let tryGuessingWord: () => void;
</script>

<div id="keyboard">
  <KeyRow>
    <Key key="Q" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="W" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="E" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="R" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="T" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="Y" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="U" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="I" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="O" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="P" {letterColorMap} clickHandler={tryAddingLetter} />
  </KeyRow>
  <KeyRow>
    <Key key="A" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="S" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="D" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="F" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="G" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="H" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="J" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="K" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="L" {letterColorMap} clickHandler={tryAddingLetter} />
  </KeyRow>
  <KeyRow>
    <Key key="Enter" {letterColorMap} clickHandler={tryGuessingWord} />
    <Key key="Z" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="X" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="C" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="V" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="B" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="N" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="M" {letterColorMap} clickHandler={tryAddingLetter} />
    <Key key="Delete" {letterColorMap} clickHandler={tryDeletingLetter} />
  </KeyRow>
</div>

<style>
  #keyboard {
    margin-top: 1em;
    align-self: flex-end;
  }
</style>
