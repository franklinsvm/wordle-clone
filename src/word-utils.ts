import wordBank from "./word-bank.json";

export function getRandomWord(): string {
  return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)];
}

export enum LetterState {
  Miss,
  Present,
  Match,
}

export function computeGuess(
  guess: string,
  answerString: string
): LetterState[] {
  const result: LetterState[] = [];

  const guessArray = guess.split("");
  const answerArray = answerString.split("");

  guessArray.forEach((letter, index) => {
    if (letter === answerArray[index]) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });
  return result;
}
