import { VALID_ANSWERS } from "./answers";
import WordGame from "./game";
import { BAIT_VALIDATION_FUNC } from "./games/brutle";
import { COUNT_VALIDATION_FUNC } from "./games/countle";
import type { WordColor } from "./guess";

function daysBetweenDates(date1: Date, date2: Date) {
  // set the time components of both dates to midnight
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  let date1Ms = date1.getTime();
  let date2Ms = date2.getTime();

  let differenceMs = Math.abs(date2Ms - date1Ms);

  return Math.max(Math.ceil(differenceMs / (1000 * 60 * 60 * 24)), 0);
}

type GameData = {
  validationFunc: (guess: string, target: string) => { colors: WordColor[] };
  rules: string;
};

function getGameData(index: number) {
  const games: GameData[] = [
    {
      validationFunc: BAIT_VALIDATION_FUNC,
      rules:
        "each guess has one incorrect piece of information except if you guessed the word correctly.",
    },
    {
      validationFunc: COUNT_VALIDATION_FUNC,
      rules:
        "each guess only reveals the number of each colour not their positions.",
    },
  ];
  return games[index % games.length];
}
export function getGameForToday() {
  const answerIndex =
    daysBetweenDates(new Date("2023-12-12"), new Date()) % VALID_ANSWERS.length;

  const gameData = loadGameFromLocalStorage();

  const { validationFunc, rules } = getGameData(answerIndex);

  const game = new WordGame(VALID_ANSWERS[answerIndex], validationFunc, rules);

  const currentAnswer = JSON.parse(gameData!)?.answer;

  if (gameData && currentAnswer === game.answer) {
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
