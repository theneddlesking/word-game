import type Game from "./game";

// 7 is for seven or above
export type Score = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type UserData = {
  scores: Score[];
  winPercentage: number;
  played: number;
  currentStreak: number;
  longestStreak: number;
};

export function addGameToUserData(userData: UserData, game: Game) {
  const { scores, currentStreak, longestStreak, played } = userData;
  const { gameWon } = game;

  const newScore = game.gameWon ? (game.getNumberOfGuesses() as Score) : 7;
  const newScores = [...scores, newScore];
  const newPlayed = played + 1;
  const newCurrentStreak = gameWon ? currentStreak + 1 : 0;
  const newLongestStreak = Math.max(longestStreak, newCurrentStreak);

  const newWinPercentage =
    Math.round(newScores.filter((score) => score <= 6).length / newPlayed) *
    100;

  return {
    scores: newScores,
    winPercentage: newWinPercentage,
    played: newPlayed,
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
  };
}

export function saveUserData(userData: UserData) {
  localStorage.setItem("userData", JSON.stringify(userData));
}

export function getUserData(): UserData {
  const userData = localStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  } else {
    return {
      scores: [],
      winPercentage: 0,
      played: 0,
      currentStreak: 0,
      longestStreak: 0,
    };
  }
}
