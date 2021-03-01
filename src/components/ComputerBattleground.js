import React, {useState} from 'react';
import ArrayOfShips from './ArrayOfShips';
import GenerateShips from './GenerateShips'

import './css/App.css';
// import './ShipList.css';
let row = 10;
let computerCells = Array.from( new Array(100), function() { return {ClassName: 'computer-cell', content: ''}});
let countRenders = 0;

const ComputerBattleGround = (props) => {
  countRenders ++;
  if(countRenders < 2) {
    GenerateShips(ArrayOfShips[0],computerCells,row);
    GenerateShips(ArrayOfShips[0],computerCells,row);
    GenerateShips(ArrayOfShips[0],computerCells,row);
    GenerateShips(ArrayOfShips[0],computerCells,row);
    GenerateShips(ArrayOfShips[1],computerCells,row);
    GenerateShips(ArrayOfShips[1],computerCells,row);
    GenerateShips(ArrayOfShips[1],computerCells,row);
    GenerateShips(ArrayOfShips[2],computerCells,row);
    GenerateShips(ArrayOfShips[2],computerCells,row);
    GenerateShips(ArrayOfShips[3],computerCells,row);
  }

//playing






    function revealComputerCell(cell,e) {
  if(props.turn === 'user' && !props.gameOver) {
    if(!e.target.className.includes('damaged') && !e.target.className.includes('missed')) {
      if(cell.ClassName.includes('destroyer')) props.setCountDestroyer(props.countDestroyer +1)
      if(cell.ClassName.includes('submarine')) props.setCountSubmarine(props.countSubmarine +1)
      if(cell.ClassName.includes('battleship')) props.setCountBattleship(props.countBattleship +1)
      if(cell.ClassName.includes('carrier')) props.setCountCarrier(props.countCarrier +1)
      if(cell.ClassName.includes('taken')) {
       cell.ClassName = `${cell.ClassName} damaged`;
       e.target.className = `${cell.ClassName} damaged`
      } else {
        e.target.className = `${cell.ClassName} missed`
        cell.ClassName = `${cell.ClassName} missed`;
      }
      props.setTurn('computer');
    }
     
    }

  }
  


  return (
    <div className="computer-battleground">
      <div className="computer-cells-container">
       {computerCells.map((computerCell,i) => 
      <div
        onClick={(e) => revealComputerCell(computerCell,e)}
        className={computerCell.ClassName} 
        key={i} 
        id={`computerCell-${i}`}
        >{computerCell.content}
      </div>)}
    </div>
    </div> 
  )
}



export default ComputerBattleGround; 

