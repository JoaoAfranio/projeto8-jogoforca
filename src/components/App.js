export default function App(){
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    return(
        <div class="app">
            <div class="game">
                <img src="./src/assets/forca0.png"/>
                <button>Escolher Palavra</button>
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