import React ,{useState}from 'react';
import ArrayOfShips from './ArrayOfShips';

import './css/App.css';
// import './ShipList.css';
let row = 10;


const ComputerBattleGround = (props) => {

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
//playing

// const [countDestroyer, setCountDestroyer] = useState(0)
// const [countSubmarine, setCountSubmarine] = useState(0)
// const [countBattleship, setCountBattleship] = useState(0)
// const [countCarrier, setCountCarrier] = useState(0)

let countDestroyer = 0;
let countSubmarine = 0;
let countBattleship = 0;
let countCarrier = 0;



    function revealCell(cell) {
  if(props.turn === 'userTurn') {
      if(cell.ClassName.includes('destroyer')) countDestroyer ++
      if(cell.ClassName.includes('submarine')) countSubmarine ++
      if(cell.ClassName.includes('battleship')) countBattleship ++
      if(cell.ClassName.includes('carrier')) countCarrier ++

      if(cell.ClassName.includes('taken')) {
       cell.ClassName = `${cell.ClassName} damaged`;
       console.log(cell)
      }
    }
    // computerCells.forEach(cell =>  revealCell(cell))
    // console.log(countDestroyer,countSubmarine,countBattleship,countCarrier)
  } 

  return (
    <div className="computer-cells-container">
       {computerCells.map((computerCell,i) => 
      <div
        onClick={() => revealCell(computerCell)}
        className={computerCell.ClassName} 
        key={i} 
        id={`computerCell-${i}`}
        >{computerCell.content}
      </div>)}
    </div>
  )
}

export default ComputerBattleGround; 

