import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";
import Header from "./components/Header.jsx";


const PLAYERS = { X: "Player 1", O: "Player 2" };
const INITIAL_VALUES = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveBoardArr(gameTurns) {
  let BoardArr = [...INITIAL_VALUES].map((arr) => [...arr]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    BoardArr[row][col] = player;
  }
  return BoardArr;
}
function deriveWinner(BoardArr, playerInfo) {
  let winner = null;
  for (const compination of WINNING_COMBINATIONS) {
    const firstSqareSymb = BoardArr[compination[0].row][compination[0].column];
    const secondSqareSymb = BoardArr[compination[1].row][compination[1].column];
    const thirdqareSymb = BoardArr[compination[2].row][compination[2].column];
    if (
      firstSqareSymb &&
      firstSqareSymb === secondSqareSymb &&
      firstSqareSymb === thirdqareSymb
    ) {
      winner = playerInfo[firstSqareSymb];
    }
  }
  return winner;
}
function extractActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O"; // Switch to next player if previous player was 'X'
  }
  return currentPlayer;
}

function App() {
  const [playerInfo, setPlayerInfo] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = extractActivePlayer(gameTurns);
  const BoardArr = deriveBoardArr(gameTurns);
  const winner = deriveWinner(BoardArr, playerInfo);
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowI, colI) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = extractActivePlayer(prevGameTurns);

      const newGameTurns = [
        { square: { row: rowI, col: colI }, player: currentPlayer },
        ...prevGameTurns,
      ];
      return newGameTurns;
    });
  }
  
  function resetGame() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    // Add logic to handle player name change
    setPlayerInfo((prevPlayerInfo) => {
      return {
        ...prevPlayerInfo,
        [symbol]: newName,
      };
    });
  }

  return (
    <>
    <Header/>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={"Player 1"}
              symbol={"X"}
              isActive={activePlayer == "X"}
              onChangeName={handlePlayerName}
            />
            <Player
              initialName={"Player 2"}
              symbol={"O"}
              isActive={activePlayer == "O"}
              onChangeName={handlePlayerName}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} resetGame={resetGame} />
          )}
          <GameBoard
            onSelectSquere={handleSelectedSquare}
            activePlayerSymbol={activePlayer}
            finalBoard={BoardArr}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
