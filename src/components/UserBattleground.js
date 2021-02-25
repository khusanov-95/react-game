import React ,{useState, useRef}from 'react';
import ShipList from './ShipsList';

import './UserBattleground.css';
import './ShipList.css';
const UserBattleground = () => {

  const [shipCellId, setShipCellId] = useState('');
  const [dragedShip, setDragedShip] = useState(null);
  const [isVertical, setIsVertical] = useState(false);


  const Refs = useRef([]);  // multiple refs logic = https://dev.to/mattc/adding-react-refs-to-an-array-of-items-3lik

  let row = 10;
  let userCells = [];



//create cells 
function createCells() {
  for(let i = 0; i < 100; i++) {
    userCells.push(<div 
      className="user-cell" 
      key={i} 
      id={`userCell-${i}`}
      // onDragStart={(e) => dragStartHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnter={(e) => dragEnterHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dragDropHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      ref={(element) => Refs.current.push(element)}
      ></div>)
  }
}

createCells()

let DomCells = Refs.current

// function dragStartHandler(e) {
//   // console.log(e.target);
//   // console.log(this);
//   // console.log(e)
// }

function dragOverHandler(e) {
  e.preventDefault()
  // console.log(cellId)
  // console.log('dragover')
}

function dragEnterHandler(e) {
  e.preventDefault();
  // console.log('drag enter')
}

function dragLeaveHandler(e) {
  // console.log('drag leave');
}

function dragDropHandler(e){
  let dragedShipCells = dragedShip.childNodes;

  let shipCellLastId = dragedShipCells[dragedShip.childNodes.length - 1].id;
  let shipClass = shipCellLastId.slice(0, -4);
  let userCellIndex = +e.target.id.substr(9)
  let ShipLastIndex= +shipCellLastId.substr(-1);
  let ShipLastIdOnBoard = ShipLastIndex + userCellIndex;
  let selectedShipId = +shipCellId.substr(-1);
    // shipLastIdOnBoardVertical
  let ShipLastIdOnBoardVertical =  (ShipLastIdOnBoard - (dragedShipCells.length - 1)) + (10 * ShipLastIndex);

  ShipLastIdOnBoard = ShipLastIdOnBoard - selectedShipId; 
  ShipLastIdOnBoardVertical = ShipLastIdOnBoardVertical - selectedShipId * 10;


  
  let ShipNotAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62,72,82,92].splice(0, 10 * ShipLastIndex) // preventse ship to go to next row cells horizontally
  

  if(!isVertical && !ShipNotAllowedHorizontal.includes(ShipLastIdOnBoard)) {
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
       if(ShipLastIdOnBoard < 100) DomCells[userCellIndex - selectedShipId + i].classList.add('taken',shipClass);
       else return 
    }
  }else if (isVertical) {
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
      if(ShipLastIdOnBoardVertical < 100 && ShipLastIdOnBoardVertical > row * (dragedShipCells.length - 1)) DomCells[(userCellIndex - row * selectedShipId)+ row * i].classList.add('taken',shipClass)
      else return 
    }
  } else {
  return 
  }
 
  // remove ship from ship list
  dragedShip.style.display = 'none';

  setIsVertical(false)
}


function dragEndHandler(e) {
  console.log('drag end')
}

  return (
    <div className="user-cells-container">
      {userCells}
     <ShipList 
     selectedCellId = {shipCellId => setShipCellId(shipCellId)} 
     getDragedShip = {dragedShip => setDragedShip(dragedShip)}
     getIsVertical = {isVertical => setIsVertical(isVertical)}
    //  getDragedShipLength = {dragedShipLength => setDragedShipLength(dragedShipLength)}
     />
    </div>
  )
}




export default UserBattleground; 