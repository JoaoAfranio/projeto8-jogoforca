import words from "./words";
import React from "react";

import forca0 from "../images/forca0.png";
import forca1 from "../images/forca1.png";
import forca2 from "../images/forca2.png";
import forca3 from "../images/forca3.png";
import forca4 from "../images/forca4.png";
import forca5 from "../images/forca5.png";
import forca6 from "../images/forca6.png";

export default function App() {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const imagesHangman = [
    forca0,
    forca1,
    forca2,
    forca3,
    forca4,
    forca5,
    forca6,
  ];

  const [word, setWord] = React.useState("");
  const [splitedWord, setSplitedWord] = React.useState("");

  const [guessedLetters, setGuessedLetters] = React.useState([]);

  const [letterState, setLetterState] = React.useState(false);

  const [hangmanImg, setHangmanImg] = React.useState(0);

  const [error, setError] = React.useState(0);

  const [victory, setVictory] = React.useState();

  const [guessInput, setGuessInput] = React.useState("");

  function randomWord() {
    return Math.floor(words.length * Math.random());
  }

  function selectWord() {
    const word = words[randomWord()];
    setWord(word);

    setSplitedWord(word.split(""));

    setGuessedLetters([]);
    setLetterState(true);
    setHangmanImg(0);
    setError(0);
    setVictory();
    setGuessInput("");
  }

  function guessLetter(letter) {
    letter = specialChar(letter);

    if (letter.length > 1) {
      const positionLetters = letter.map((l) => {
        return splitedWord.indexOf(l);
      });

      const hasLetter = positionLetters.filter((l) => (l >= 0 ? true : false));

      if (hasLetter.length === 0) {
        setHangmanImg(hangmanImg + 1);
        setError(error + 1);
      }
    } else {
      if (splitedWord.indexOf(letter) === -1) {
        setHangmanImg(hangmanImg + 1);
        setError(error + 1);
      }
    }

    error >= 5
      ? setLetterState(false)
      : setGuessedLetters((arrayGuessed) => [...arrayGuessed, ...letter]);
  }

  function specialChar(letter) {
    switch (letter) {
      case "a":
        return ["a", "á", "ã"];
      case "e":
        return ["e", "é", "ê"];
      case "i":
        return ["i", "í"];
      case "o":
        return ["o", "ó", "ô"];
      case "u":
        return ["u", "ú"];
      default:
        return letter;
    }
  }

  function renderWord() {
    if (splitedWord.length === 0) return;

    const winGame = verifyVictory();
    if (winGame === true) {
      return <span className={"win"}>{word}</span>;
    }

    if (error <= 5 && victory === undefined) {
      return splitedWord.map((l, index) => {
        return guessedLetters.includes(l) ? (
          <span key={index}>{l}</span>
        ) : (
          <span key={index}>_</span>
        );
      });
    } else if (error === 6) {
      return <span className="defeat">{word}</span>;
    }

    return <span className={victory === true ? "win" : "defeat"}>{word}</span>;
  }

  function verifyVictory() {
    let wordGame = "";
    splitedWord.map((l) => {
      return guessedLetters.includes(l) ? (wordGame += l) : (wordGame += "_");
    });
    if (wordGame === word) return true;
  }

  function renderAlphabet() {
    return alphabet.map((letter, index) => {
      return !letterState ? (
        <button
          key={index}
          disabled
          className="disabled"
          data-identifier="letter"
        >
          {" "}
          {letter.toUpperCase()}
        </button>
      ) : guessedLetters.indexOf(letter) === -1 ? (
        <button
          key={index}
          onClick={() => {
            guessLetter(letter);
          }}
          className="enabled"
          data-identifier="letter"
        >
          {letter.toUpperCase()}
        </button>
      ) : (
        <button
          key={index}
          disabled
          className="disabled"
          data-identifier="letter"
        >
          {letter.toUpperCase()}
        </button>
      );
    });
  }

  function guessWord(guess) {
    if (guess === word) {
      setVictory(true);
    } else {
      setVictory(false);
      setHangmanImg(6);
    }

    setLetterState(false);
  }

  return (
    <div className="app">
      <div className="game">
        <img
          data-identifier="game-image"
          src={imagesHangman[hangmanImg]}
          alt="hangman"
        />
        <button data-identifier="choose-word" onClick={selectWord}>
          Escolher Palavra
        </button>
        <p data-identifier="word">{renderWord()}</p>
      </div>
      <div className="letters">{renderAlphabet()}</div>
      <div className="guess">
        <p>Já sei a palavra!</p>
        <input
          data-identifier="type-guess"
          value={guessInput}
          onChange={(e) => {
            setGuessInput(e.target.value);
          }}
        />
        <button
          data-identifier="guess-button"
          onClick={() => {
            guessWord(guessInput);
          }}
        >
          Chutar
        </button>
      </div>
    </div>
  );
}
