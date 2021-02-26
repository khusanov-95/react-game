import React from 'react';
import ArrayOfShips from './ArrayOfShips';

import './ComputerBattleground.css';
// import './ShipList.css';
let row = 10;

const ComputerBattleGround = () => {
  let computerCells = Array.from( new Array(100), function() { return {ClassName: 'computer-cell', content: ''}});

  function generateShip(ship) {
    let position;
    let randomPosition = Math.floor(Math.random() * ship.positions.length);
    let current = ship.positions[randomPosition];
    if(randomPosition === 0 ) position = 1;
    if(randomPosition === 1 ) position = 10;
    let randomStart = Math.abs(Math.floor(Math.random() * computerCells.length - (ship.positions[0].length * position)));
    
    let Taken = current.some(i => computerCells[randomStart + i].ClassName.includes('taken'));
    let AtRightEdge = current.some(i => (randomStart + i) % row === row - 1);
    let AtLeftEdge = current.some(i => (randomStart + i) % row === 0);
   

    if(!Taken && !AtRightEdge && !AtLeftEdge) {
      current.forEach(index => computerCells[randomStart + index].ClassName = `computer-cell taken ${ship.name} ship-cell`);
        // DomCells[(randomStart + i) - 10].classList.add('taken')
        // DomCells[(randomStart + i) + 10].classList.add('taken')
        // DomCells[(randomStart + i)+ 1].classList.add('taken')
        // DomCells[(randomStart + i) - 1].classList.add('taken')
        // DomCells[(randomStart + i) - 9].classList.add('taken')
        // DomCells[(randomStart + i) - 11].classList.add('taken')
        // DomCells[(randomStart + i) + 9].classList.add('taken')
        // DomCells[(randomStart + i) + 11].classList.add('taken')
        }
    else {
      generateShip(ship)
    }     
  }
  
  generateShip(ArrayOfShips[0]);
  generateShip(ArrayOfShips[0]);
  generateShip(ArrayOfShips[0]);
  generateShip(ArrayOfShips[0]);
  generateShip(ArrayOfShips[1]);
  generateShip(ArrayOfShips[1]);
  generateShip(ArrayOfShips[1]);
  generateShip(ArrayOfShips[2]);
  generateShip(ArrayOfShips[2]);
  generateShip(ArrayOfShips[3]);

  return (
    <div className="computer-cells-container">
       {computerCells.map((computerCell,i) => 
      <div 
        className={computerCell.ClassName} 
        key={i} 
        id={`computerCell-${i}`}
        >{computerCell.content}
      </div>)}
    </div>
  )
}

export default ComputerBattleGround; 

