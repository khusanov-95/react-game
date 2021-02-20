import React from 'react';
import ComputerBattleGround from './ComputerBattleground';
import UserBattleground from './UserBattleground';
import ShipsList from './ShipsList';

import './App.css'






const App = () => {
  return (
    <div className="container">
      <UserBattleground row ={row} cells={cells}/>
      <ComputerBattleGround row ={row} cells={cells}/>
      <ShipsList row={row} cells={cells}/>
    </div>
  );
}
let row = 10;

let cells = [];


//create cells 
function createCells() {
  for(let i = 0; i < 100; i++) {
    cells.push(<div className="cell" key={i} id={`cell-${i}`}></div>)
  }
}
createCells()

export default App; 