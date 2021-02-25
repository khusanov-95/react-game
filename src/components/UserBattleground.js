import React ,{useState, useRef}from 'react';
import ShipList from './ShipsList';

import './UserBattleground.css';
import './ShipList.css';
const UserBattleground = () => {

  const [shipCellId, setShipCellId] = useState('');
  const [dragedShip, setDragedShip] = useState(null);
  const [isVertical, setIsHorizontal] = useState(false);


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
  let ShipLastIdOnBoard = ShipLastIndex + userCellIndex
  let selectedShipId = +shipCellId.substr(-1)


  ShipLastIdOnBoard = ShipLastIdOnBoard - selectedShipId; 


  let shipFirstIdOnBoardVertical = ShipLastIdOnBoard - (dragedShipCells.length - 1);
  let shipLastIdOnBoardVertical =  shipFirstIdOnBoardVertical + (10 * ShipLastIndex);




  console.log(shipLastIdOnBoardVertical,shipLastIdOnBoardVertical - (selectedShipId * 10))
  const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62,72,82,92]
  // const notAllowedVertical = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  
  let ShipNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * ShipLastIndex)
  // let ShipNotAllowedVertical = notAllowedVertical.splice(0, 10 * ShipLastIndex)

  if(!isVertical && !ShipNotAllowedHorizontal.includes(ShipLastIdOnBoard)) {
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
       if(ShipLastIdOnBoard < 100) DomCells[userCellIndex - selectedShipId + i].classList.add('taken',shipClass);
       else return 
  } }
  else if (isVertical) {
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
      if(shipLastIdOnBoardVertical < 100 && shipLastIdOnBoardVertical > 0) DomCells[userCellIndex - selectedShipId + row * i].classList.add('taken',shipClass)
      else return 
    }
  } else {
  return 
  }
  // remove ship from ship list
  dragedShip.style.display = 'none';
  setIsHorizontal(false)
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
     getIsVertical = {isVertical => setIsHorizontal(isVertical)}
    //  getDragedShipLength = {dragedShipLength => setDragedShipLength(dragedShipLength)}
     />
    </div>
  )
}




export default UserBattleground; 