import React from 'react';
import ArrayOfShips from './ArrayOfShips';
import GenerateShips from './GenerateShips';

import useSound from 'use-sound';
import shipDestroyedSound from '../sounds/damage.mp3';
import blop from '../sounds/blop.mp3';

import './css/App.css';

// initialize row of cell, countRenders, create 100 Computer cells, 
let row = 10;
let computerCells = Array.from( new Array(100), function() { return {ClassName: 'computer-cell', content: ''}});
let countRenders = 0;

// generate ships or regenerate if game is restarted
const ComputerBattleGround = (props) => {
  const [playDamage] = useSound(
    shipDestroyedSound,
    {volume: props.soundVolume ? (0.5) : (0)}
  )
  const [playBlop] = useSound(
    blop,
    {volume: props.soundVolume ? (0.5) : (0)}
  )

  if (props.restart) {
    countRenders = 0;
    computerCells.map(cell => cell.ClassName = "computer-cell");
  }
  if(!props.restart && countRenders < 1) {
    countRenders ++; //check countRenders to not to rerender ships again
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
    
  // reveal cells when clicked, idea of function logic was taken from https://github.com/kubowania/battleships/blob/master/public/singleplayer.html
  function revealComputerCell(cell,e) { 
  if(props.turn === 'user' && !props.gameOver && props.startGame || props.turn === 'user' && !props.restart && props.startGame) {
    if(!e.target.className.includes('damaged') && !e.target.className.includes('missed')) {
      if(cell.ClassName.includes('destroyer')) props.setCountDestroyer(props.countDestroyer +1)
      if(cell.ClassName.includes('submarine')) props.setCountSubmarine(props.countSubmarine +1)
      if(cell.ClassName.includes('battleship')) props.setCountBattleship(props.countBattleship +1)
      if(cell.ClassName.includes('carrier')) props.setCountCarrier(props.countCarrier +1)
      if(cell.ClassName.includes('taken')) {
       cell.ClassName = `${cell.ClassName} damaged`;
       e.target.className = `${cell.ClassName} damaged`;
       playDamage()
      } else {
        e.target.className = `${cell.ClassName} missed`
        cell.ClassName = `${cell.ClassName} missed`;
        playBlop()
      }
      setTimeout(props.setTurn('computer'),0);
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
    <div className="destroyed-ships">
                  {props.countDestroyer === 1 ? (
                    <div className="destroyed-ship destroyed-destroyer">
                      <div></div>
                    </div>
                  ) : ('')}
                  {props.countDestroyer === 2 ? (
                  <div className="destroyed-ship destroyed-destroyer">
                    <div className="destroyed-ship-with-margin"></div><div className="destroyed-ship-with-margin"></div>
                  </div>
                  ) : ('')}
                 {props.countDestroyer === 3 ? (
                  <div className="destroyed-ship destroyed-destroyer">
                    <div className="destroyed-ship-with-margin"></div><div className="destroyed-ship-with-margin"></div><div className="destroyed-ship-with-margin"></div> 
                  </div>
                  ) : ('')}
                  {props.countDestroyer === 4 ? (
                  <div className="destroyed-ship destroyed-destroyer">
                    <div className="destroyed-ship-with-margin"></div><div className="destroyed-ship-with-margin"></div><div className="destroyed-ship-with-margin"></div><div className="destroyed-ship-with-margin"></div>
                  </div>
                  ) : ('')}
                  {props.countSubmarine === 2 || props.countSubmarine === 3? (<div className="destroyed-ship destroyed-submarine">
                    <div></div><div></div>
                  </div>) : ('')}
                  {props.countSubmarine === 4 || props.countSubmarine === 5? (<div className="destroyed-ship destroyed-submarine ">
                    <div></div><div className="destroyed-ship-with-margin"></div><div ></div><div></div>
                  </div>) : ('')}
                  {props.countSubmarine === 6 ? (<div className="destroyed-ship destroyed-submarine ">
                    <div></div><div className="destroyed-ship-with-margin"></div><div></div><div className="destroyed-ship-with-margin"></div><div></div><div></div>
                  </div>) : ('')}
                  {props.countBattleship === 3 || props.countBattleship === 4 || props.countBattleship === 5 ? (<div className="destroyed-ship destroyed-battleship">
                    <div></div><div></div><div></div> 
                  </div>) : ('')}
                  {props.countBattleship === 6 ? (<div className="destroyed-ship destroyed-battleship ">
                    <div></div><div></div><div className="destroyed-ship-with-margin"></div><div></div><div></div><div></div> 
                  </div>) : ('')}
                  {props.countCarrier === 4 ? (<div className="destroyed-ship destroyed-carrier">
                    <div></div><div></div><div></div><div></div>
                  </div>) : ('')}

              </div>
    </div> 
  )
}

export default ComputerBattleGround; 

