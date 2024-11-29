export default function GameBoard({ onSelectSquere, finalBoard }) {
return (
<>
<ol id="game-board">
{finalBoard.map((row, rowI) => (
    <li key={rowI}>
    <ol>
        {row.map((col, colI) => (
        <button
            key={colI}
            onClick={() => onSelectSquere(rowI, colI)}
            disabled={row[colI] !== null}
        >
            {col}
        </button>
        ))}
    </ol>
    </li>
    ))}
    </ol>
</>
);
}
