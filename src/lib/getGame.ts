import { VALID_ANSWERS } from "./answers";
import WordGame from "./game";
import type { GuessDetails } from "./guess";

export function getGame(
  answerIndex: number,
  validationFunc: (guess: string, target: string) => GuessDetails
) {
  const gameData = loadGameFromLocalStorage();

  const game = new WordGame(VALID_ANSWERS[answerIndex], validationFunc);

  if (gameData) {
    game.load(gameData);
  }

  return game;
}

function loadGameFromLocalStorage() {
  const game = localStorage.getItem("game");
  if (game) {
    return game;
  }
  return null;
}
