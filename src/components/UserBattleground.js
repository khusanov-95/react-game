import React ,{useState, useRef}from 'react';
import ShipList from './ShipsList';

import './UserBattleground.css';
import './ShipList.css';
const UserBattleground = () => {

  const [shipCellId, setShipCellId] = useState('');
  const [dragedShip, setDragedShip] = useState(null);
  const [isHorizontal, setIsHorizontal] = useState(false);


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
  let ShipLastIdOnBoard = ShipLastIndex + userCellIndex// change name
  let selectedShipId = +shipCellId.substr(-1)
  ShipLastIdOnBoard = ShipLastIdOnBoard - ShipLastIndex; // ?

  console.log(userCellIndex);

  const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
  const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
  
  let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * ShipLastIndex)
  let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * ShipLastIndex)


  if(isHorizontal && !newNotAllowedHorizontal.includes(ShipLastIdOnBoard)) {
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
      DomCells[userCellIndex - selectedShipId + i].classList.add('taken',shipClass);
    }
  } else if (!isHorizontal && !newNotAllowedVertical.includes(ShipLastIdOnBoard)) {
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
        DomCells[userCellIndex - selectedShipId + row * i].classList.add('taken',shipClass)
    }
  } else {
  return 
  }
  // remove ship from ship list
  dragedShip.style.display = 'none';
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
     getIsHorizontal = {isHorizontal => setIsHorizontal(isHorizontal)}
    //  getDragedShipLength = {dragedShipLength => setDragedShipLength(dragedShipLength)}
     />
    </div>
  )
}




export default UserBattleground; 