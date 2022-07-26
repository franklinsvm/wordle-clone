import { answerSelector, useStore, WORD_LENGTH } from "./store";
import { LetterState } from "./word-utils";

interface WordRowProps {
  word: string;
  result?: LetterState[];
  className?: string;
}
export default function WordRow({
  word = "",
  result = [],
  className = "",
}: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - word.length;
  const letters = word.split("").concat(Array(lettersRemaining).fill(""));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value?: string;
  state?: LetterState;
}
function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles =
    state == null
      ? "border-gray-500 text-black"
      : `${characterStateStyles[state]} text-white`;

  return (
    <span
      className={`border-2 p-2 w-14 h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 flex justify-center items-center min-w-full uppercase text-center font-extrabold text-4xl before:inline-block before:content-['_'] ${stateStyles} `}
    >
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "border-gray-500 bg-gray-500",
  [LetterState.Present]: "border-yellow-500 bg-yellow-500",
  [LetterState.Match]: "border-green-500 bg-green-500",
};
