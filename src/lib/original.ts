import Game from "./game";

export const ORIGINAL = new Game("hello", (guess: string, target: string) => {
  const colors = [];

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      // correct letter in correct position
      colors.push("green");
    } else if (target.includes(guess[i])) {
      // correct letter in wrong position
      colors.push("yellow");
    } else {
      // incorrect letter
      colors.push("gray");
    }
  }

  return { colors, guess };
});
