
export default function GameOver({winner , resetGame}) {
return (
    <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p className="capitalize">{ winner } is Won !</p> }
        {!winner && <p> it's draw!</p>  }
        <button onClick={resetGame} >Restart Game</button>

    </div>
)
}
