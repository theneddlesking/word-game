import Guess, { type GuessDetails } from "./guess";
import { VALID_WORDS } from "./words";

export default class Game {
  answer: string;
  guesses: Guess[];
  maxGuesses: number;
  validWords: string[];
  gameWon: boolean;
  wordLength: number;
  isValidGuess: (guess: string) => boolean;
  getGuessDetails: (guess: string, target: string) => GuessDetails;

  constructor(
    answer: string,
    getGuessDetails: (guess: string, target: string) => GuessDetails,
    isValidGuess: (guess: string) => boolean = (guess: string) =>
      this.validWords.includes(guess),
    validWords: string[] = VALID_WORDS
  ) {
    this.answer = answer;
    this.guesses = [];
    this.maxGuesses = 6;
    this.validWords = validWords;
    this.gameWon = false;
    this.getGuessDetails = getGuessDetails;
    this.isValidGuess = isValidGuess;

    this.wordLength = 5;
  }

  makeGuess(word: string) {
    if (
      !this.isValidGuess(word) ||
      // already guessed too many times
      this.getNumberOfGuesses() >= this.maxGuesses ||
      // game already won
      this.gameWon
    ) {
      return {
        invalidGuess: true,
        gameWon: this.gameWon,
        gameOver: this.gameWon || this.getNumberOfGuesses() >= this.maxGuesses,
      };
    }

    const response = this.getGuessDetails(word, this.answer);

    // add the current guess
    this.guesses.push(new Guess(word, response));

    if (word === this.answer) {
      this.gameWon = true;
    }

    return {
      invalidGuess: false,
      response,
      gameWon: this.gameWon,
      gameOver: this.gameWon || this.getNumberOfGuesses() >= this.maxGuesses,
    };
  }

  getNumberOfGuesses() {
    return this.guesses.length;
  }
}
