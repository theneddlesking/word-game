import type { WordColor } from "../guess";

export const BAIT_VALIDATION_FUNC = (guess: string, target: string) => {
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

  // if colors are all green then use those
  if (colors.every((color) => color === "green")) {
    return { colors };
  }

  // randomly replace one color with another
  let currColor = null;
  let randomColor = null;
  while (currColor == randomColor) {
    const randomIndex = Math.floor(Math.random() * guess.length);
    const allColors: WordColor[] = ["green", "yellow", "gray"];
    randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    currColor = colors[randomIndex];

    if (currColor != randomColor) {
      colors[randomIndex] = randomColor;
    }
  }

  return { colors };
};
