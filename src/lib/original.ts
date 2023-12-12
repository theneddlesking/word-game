import Game from "./game";

export const ORIGINAL = new Game("hello", (guess: string, target: string) => {
  const colors = [];

  // track indices of correctly guessed letters in the target
  const correctIndices = new Set();

  // check for correct letters in the correct position (green)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      colors[i] = "green";
      correctIndices.add(i);
    }
  }

  // check for correct letters in the wrong position (yellow)
  for (let i = 0; i < guess.length; i++) {
    if (
      guess[i] !== target[i] &&
      target.includes(guess[i]) &&
      !correctIndices.has(i)
    ) {
      colors[i] = "yellow";
      correctIndices.add(i);
    }
  }

  // fill the remaining slots with incorrect (gray)
  for (let i = 0; i < guess.length; i++) {
    if (!correctIndices.has(i)) {
      colors[i] = "gray";
    }
  }

  return { colors, guess };
});
