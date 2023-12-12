import Game from "./game";
import type { GuessDetails } from "./guess";

export function getGame(
  answer: string,
  validationFunc: (guess: string, target: string) => GuessDetails
) {
  const gameData = loadGameFromLocalStorage();

  const game = new Game(answer, validationFunc);

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
