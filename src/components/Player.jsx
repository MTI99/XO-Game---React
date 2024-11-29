import { useState } from "react";

export default function Player({ initialName, symbol , isActive , onChangeName }) {
const [isEditing, setIsEditing] = useState(true);
const [ playerName , setPlayerName ] = useState(initialName)
function handleEditing() {
setIsEditing((wasEdited) => !wasEdited);
if (!isEditing) { 
    onChangeName(symbol , playerName)
}

}

function handleChange(e) { 
    console.log(e.target.value);
    setPlayerName(e.target.value);
}

return (
<li className={isActive ? 'active' : null}>
    <span className="player">
    {isEditing ? (
        <span className="player-name">{playerName}</span>
    ) : (
        <input type="text" required value={playerName} onChange={handleChange} ></input>
    )}
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditing}>{!isEditing ? "Save" : "Edit"}</button>
</li>
);
}
