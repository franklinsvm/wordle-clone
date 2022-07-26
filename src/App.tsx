import { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import { useStore, NUMBER_OF_GUESSES, WORD_LENGTH } from "./store";
import { isValidWord } from "./word-utils";
import WordRow from "./WordRow";

export default function App() {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();

  const [showInvalidGuess, setInvalidGuess] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1500);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      if (isValidWord(previousGuess)) {
        setInvalidGuess(false);
        addGuess(previousGuess);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  const isGameOver = state.gameState !== "playing";
  const hasWon = state.gameState == "won";

  let rows = [...state.rows];

  let currentRow = 0;
  if (rows.length < NUMBER_OF_GUESSES) {
    currentRow = rows.push({ guess }) - 1;
  }

  const guessesRemaining = NUMBER_OF_GUESSES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(""));

  return (
    <div className="mx-auto relative h-screen h-screen bg-gradient-to-r from-emerald-100 to-teal-300">
      <div className=" w-10/12 md:w-96 lg:w-96 mx-auto">
        <header className="border-b border-gray-400 py-4">
          <h1 className="text-3xl font-bold text-center uppercase">
            My Wordle!
          </h1>
        </header>

        <main className="grid grid-rows-6 gap-4 my-4">
          {rows.map((word, index) => (
            <WordRow
              key={index}
              word={word.guess}
              result={word.result}
              className={
                showInvalidGuess && index === currentRow ? "animate-bounce" : ""
              }
            />
          ))}
        </main>

        <Keyboard
          onClick={(key) => {
            addGuessLetter(key);
          }}
        />
        {(isGameOver || hasWon) && (
          <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto h-full w-full"></div>
            <div
              role="modal"
              className="absolute bg-white border border-gray-500 rounded text-center
            w-2/3 md:w-3/5 lg:w-1/4 h-1/2 p-6 left-0 right-0 mx-auto top-1/4
           grid grid-rows-3 z-10"
            >
              <p className="text-2xl font-bold mt-6">
                {hasWon ? "Congratulations!" : "Game Over"}
              </p>
              <WordRow
                word={state.answer}
                className="items-center justify-items-center py-2 mb-6"
              />
              <button
                className="border border-green-500 rounded bg-green-500 hover:bg-green-600 p-2 mt-4 text-gray-800 shadow h-20 text-lg font-bold"
                onClick={() => {
                  state.newGame();
                  setGuess("");
                }}
              >
                New Game
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState("");

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === WORD_LENGTH) {
            return "";
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
