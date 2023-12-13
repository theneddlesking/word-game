import Guess, { type GuessDetails, type WordColor } from "./guess";
import { VALID_WORDS } from "./words";

export type GuessResponse = {
  invalidGuess: boolean;
  details?: GuessDetails;
  gameWon: boolean;
  gameOver: boolean;
  guess: string;
};

export type LetterColorMap = {
  [letter: string]: WordColor;
};

export default class WordGame {
  answer: string;
  rules: string;
  guesses: Guess[];
  maxGuesses: number;
  validWords: string[];
  gameWon: boolean;
  wordLength: number;
  letterColorMap: LetterColorMap;
  isValidGuess: (guess: string) => boolean;
  getGuessDetails: (guess: string, target: string) => GuessDetails;

  constructor(
    answer: string,
    getGuessDetails: (guess: string, target: string) => GuessDetails,
    rules: string,
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
    this.rules = rules;

    this.letterColorMap = {};
    this.wordLength = 5;
  }

  makeGuess(word: string): GuessResponse {
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
        guess: word,
      };
    }

    const response = this.getGuessDetails(word, this.answer);

    // add the current guess
    this.guesses.push(new Guess(word, response));

    // add letters to used letters set
    for (let i = 0; i < word.length; i++) {
      // prioritise green > yellow > red

      const color = response.colors[i];
      const currentColor = this.letterColorMap[word[i]];

      // never overwrite green
      if (currentColor === "green") {
        continue;
      }

      // never overwrite yellow with gray
      if (currentColor === "yellow" && color === "gray") {
        continue;
      }

      // anything else is fine
      this.letterColorMap[word[i]] = color;
    }

    if (word === this.answer) {
      this.gameWon = true;
    }

    return {
      invalidGuess: false,
      details: response,
      gameWon: this.gameWon,
      gameOver: this.gameWon || this.getNumberOfGuesses() >= this.maxGuesses,
      guess: word,
    };
  }

  load(data: string) {
    const parsedData = JSON.parse(data);

    this.answer = parsedData.answer;
    this.guesses = parsedData.guesses.map(
      (guess: { word: string; details: GuessDetails }) =>
        new Guess(guess.word, guess.details)
    );
    this.maxGuesses = parsedData.maxGuesses;
    this.validWords = parsedData.validWords;
    this.gameWon = parsedData.gameWon;
    this.wordLength = parsedData.wordLength;
    this.letterColorMap = parsedData.letterColorMap;
  }

  getNumberOfGuesses() {
    return this.guesses.length;
  }

  stringify() {
    return JSON.stringify({
      answer: this.answer,
      guesses: this.guesses,
      maxGuesses: this.maxGuesses,
      validWords: this.validWords,
      gameWon: this.gameWon,
      wordLength: this.wordLength,
      letterColorMap: this.letterColorMap,
    });
  }
}
