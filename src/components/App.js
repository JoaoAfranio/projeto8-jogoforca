import words from "./words";
import React from "react";

export default function App(){
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const [word, setWord] = React.useState("");
    const [splitedWord, setSplitedWord] = React.useState("");
    const [guessedLetters, setGuessedLetters] = React.useState([]);


    function randomWord() {
        return Math.floor(words.length * Math.random());
    }

    function selectWord(){
        const word = words[randomWord()];
        setWord(word);
        setSplitedWord(word.split(""));
    }

   
    return(
        <div class="app">
            <div class="game">
                <img src="./src/assets/forca0.png"/>
                <button onClick={selectWord}>Escolher Palavra</button>
                <p>
                    {splitedWord.length > 0 ? splitedWord.map(
                        l => {
                            return guessedLetters.indexOf(l) !== -1 ? <span>{l}</span> : <span>_</span>;
                        }
                        
                    ) : ""}
                </p>
            </div>
            <div class="letters">
                {alphabet.map(letter => <button>{letter.toUpperCase()}</button>)}
            </div>
            <div class="guess">
                <p>Já sei a palavra!</p>
                <input />
                <button>Chutar</button>
            </div>
        </div>
    );
}