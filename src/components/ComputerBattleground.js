import React, {useState, useRef, useEffect} from 'react';
import ArrayOfShips from './ArrayOfShips';

import './ComputerBattleground.css';
// import './ShipList.css';

const ComputerBattleGround = () => {
  const Refs = useRef([]);  // multiple refs logic = https://dev.to/mattc/adding-react-refs-to-an-array-of-items-3lik
  //create cells 
function createCells() {
  for(let i = 0; i < 100; i++) {
    ComputerCells.push(<div className='computer-cell' key={i} id={`computerCell-${i}`} ref={(element) => Refs.current.push(element)}></div>);
  }
}
createCells();
  //generate ship //logic used https://www.youtube.com/watch?v=U64vIhh0TyM&t=2047s
useEffect(() => {
  function generateShip(ship) {
    let position;
    let DomCells = Refs.current
    let randomPosition = Math.floor(Math.random() * ship.positions.length);
    let current = ship.positions[randomPosition];
    if(randomPosition === 0 ) position = 1;
    if(randomPosition === 1 ) position = 10;
    let randomStart = Math.abs(Math.floor(Math.random() * DomCells.length - (ship.positions[0].length * position)));

    let Taken = current.some(i => DomCells[randomStart + i].classList.contains('taken'));
    let AtRightEdge = current.some(i => (randomStart + i) % row === row - 1);
    let AtLeftEdge = current.some(i => (randomStart + i) % row === 0);

     // продолжить тут 
   

    if(!Taken && !AtRightEdge && !AtLeftEdge) {
      current.forEach((i) => {
        DomCells[randomStart + i].classList.add('taken',ship.name, 'ship-cell');
        // DomCells[(randomStart + i) - 10].classList.add('taken')
        // DomCells[(randomStart + i) + 10].classList.add('taken')
        // DomCells[(randomStart + i)+ 1].classList.add('taken')
        // DomCells[(randomStart + i) - 1].classList.add('taken')
        // DomCells[(randomStart + i) - 9].classList.add('taken')
        // DomCells[(randomStart + i) - 11].classList.add('taken')
        // DomCells[(randomStart + i) + 9].classList.add('taken')
        // DomCells[(randomStart + i) + 11].classList.add('taken') // подумать
        }
      );
    } else {
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

},// add
)
  return (
    <div className="computer-cells-container">
      {ComputerCells}
    </div>
  )
}
let row = 10;
let ComputerCells = [];

export default ComputerBattleGround; 


