import { VALID_ANSWERS } from "./answers";
import WordGame from "./game";
import { BAIT_VALIDATION_FUNC } from "./games/brutle";

function daysBetweenDates(date1: Date, date2: Date) {
  // set the time components of both dates to midnight
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  let date1Ms = date1.getTime();
  let date2Ms = date2.getTime();

  let differenceMs = Math.abs(date2Ms - date1Ms);

  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
}

function getValidationFuncFromIndex(index: number) {
  const validationFuncs = [BAIT_VALIDATION_FUNC];
  return validationFuncs[index % validationFuncs.length];
}
export function getGameForToday() {
  const answerIndex =
    daysBetweenDates(new Date("2023-12-13"), new Date()) % VALID_ANSWERS.length;

  const gameData = loadGameFromLocalStorage();

  const game = new WordGame(
    VALID_ANSWERS[answerIndex],
    getValidationFuncFromIndex(answerIndex)
  );

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
