import words from "./words";
import React from "react";

import forca0 from "../images/forca0.png";
import forca1 from "../images/forca1.png";
import forca2 from "../images/forca2.png";
import forca3 from "../images/forca3.png";
import forca4 from "../images/forca4.png";
import forca5 from "../images/forca5.png";
import forca6 from "../images/forca6.png";

export default function App(){
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const imagesHangman = [forca0,forca1,forca2,forca3,forca4,forca5,forca6];
    
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

    function selectWord(){
        const word = words[randomWord()];
        setWord(word);

        setSplitedWord(word.split(""));
        
        setGuessedLetters([]);
        setLetterState(true);
        setHangmanImg(0);
        setError(0);
        setVictory();
        setGuessInput("");

        console.log(word);
    }

    function guessLetter(letter) {
        if(splitedWord.indexOf(letter) === -1){
            setHangmanImg(hangmanImg + 1);
            setError(error + 1);
        }

        error >= 5 ? setLetterState(false) : setGuessedLetters(arrayGuessed => [...arrayGuessed, letter]);
    }

    function renderWord() {
        if(splitedWord.length === 0) return;
        
        if(error <= 5 && victory === undefined){
            return splitedWord.map(
                (l, index) => {
                    return guessedLetters.indexOf(l) !== -1 ? <span key={index}>{l}</span> : <span key={index}>_</span>;
                }
            ) 
        }else if (error === 6 ){
            return <span className="defeat">{word}</span>;
        }

        return victory === true ? <span className="win">{word}</span> : <span className="defeat">{word}</span>;

    }

    function renderAlphabet() {
        return alphabet.map((letter, index) => 
            {
                return  (!letterState) ? 
                <button key={index} disabled className="disabled">{letter.toUpperCase()}</button> : 
                guessedLetters.indexOf(letter) === -1 ?
                <button key={index} onClick={() => {guessLetter(letter)}} className="enabled">{letter.toUpperCase()}</button> :
                <button key={index} disabled className="disabled">{letter.toUpperCase()}</button>
            })
    }

    function guessWord(guess) {
        guess === word ? setVictory(true) : setVictory(false); 
        setLetterState(false);
    }

    // const specialChar = {"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
    // function removeSpecialChar(s) {
    //     return s.replace(/[\W\[\] ]/g,function(a){return specialChar[a]||a})
    // }

   
    return(
        <div className="app">
            <div className="game">
                <img src={imagesHangman[hangmanImg]} alt="hangman"/>
                <button onClick={selectWord}>Escolher Palavra</button>
                <p>
                    {renderWord()}
                </p>
            </div>
            <div className="letters">
                {renderAlphabet()}
            </div>
            <div className="guess">
                <p>Já sei a palavra!</p>
                <input value={guessInput} onChange={((e) => {setGuessInput(e.target.value)})} />
                <button onClick={() => {guessWord(guessInput)}}>Chutar</button>
            </div>
        </div>
    );
}