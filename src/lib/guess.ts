export type WordColors = "green" | "yellow" | "gray" | "white" | "empty";

export default class Guess {
  word: string;
  details: GuessDetails;

  constructor(word: string, details: GuessDetails) {
    this.word = word;
    this.details = details;
  }
}

export interface GuessDetails {
  colors: WordColors[];
}
