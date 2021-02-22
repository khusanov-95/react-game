import React from 'react';
import './UserBattleground.css'

const UserBattleground = () => {
  return (
    <div className="user-cells-container">
      {cells}
    </div>
  )
}

let row = 10;

let cells = [];

//create cells 
function createCells() {
  for(let i = 0; i < 100; i++) {
    cells.push(<div className="user-cell" key={i} id={`userCell-${i}`}></div>)
  }
}
createCells()


export default UserBattleground; 