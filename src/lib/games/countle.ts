import type { WordColor } from "../guess";

export const COUNT_VALIDATION_FUNC = (guess: string, target: string) => {
  const colors: WordColor[] = [];

  // track indices of correctly guessed letters in the target
  const correctIndicies = new Set();

  // get count of each letter remaining
  const targetLetterCounts = target.split("").reduce((acc, letter) => {
    acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
    return acc;
  }, {} as Record<string, number>);

  // check for correct letters in the correct position (green)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      colors[i] = "green";
      correctIndicies.add(i);

      // prevent double counting of colors
      targetLetterCounts[guess[i]] -= 1;
    }
  }

  // check for correct letters in the wrong position (yellow)
  for (let i = 0; i < guess.length; i++) {
    if (
      guess[i] !== target[i] &&
      target.includes(guess[i]) &&
      targetLetterCounts[guess[i]] > 0
    ) {
      colors[i] = "yellow";
      correctIndicies.add(i);

      // prevent double counting of colors
      targetLetterCounts[guess[i]] -= 1;
    }
  }

  // fill the remaining slots with incorrect (gray)
  for (let i = 0; i < guess.length; i++) {
    if (!correctIndicies.has(i)) {
      colors[i] = "gray";
    }
  }

  const numberOfGreen = colors.filter((color) => color === "green").length;
  const numberOfYellow = colors.filter((color) => color === "yellow").length;
  const numberOfGray = colors.filter((color) => color === "gray").length;

  // make a new array with the correct number of each color
  const newColors: WordColor[] = [];

  for (let i = 0; i < numberOfGreen; i++) {
    newColors.push("green");
  }
  for (let i = 0; i < numberOfYellow; i++) {
    newColors.push("yellow");
  }
  for (let i = 0; i < numberOfGray; i++) {
    newColors.push("gray");
  }

  return { colors: newColors };
};
