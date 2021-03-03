import React ,{useState}from 'react';
import ShipList from './ShipsList';

import './css/App.css';
import './css/ShipList.css';
const UserBattleground = (props) => {
  console.log(props.restart)
  let row = 10;
  const [shipCellId, setShipCellId] = useState('');
  const [dragedShip, setDragedShip] = useState(null);
  const [isVertical, setIsVertical] = useState(false);
  const [userCells, setUserCells] = useState(Array.from( new Array(100), function() { return {ClassName: 'user-cell', content: '',}} ));
  // console.log(props.gameOver)
  if(props.restart) {
    userCells.map(cell => cell.ClassName = 'user-cell');
  }
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
  if(dragedShip !== null && dragedShip.className.includes('ship')) {

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
     
       if(ShipLastIdOnBoard < 100 && !userCells[userCellIndex - selectedShipId + i].ClassName.includes('taken')) {
        setUserCells(
          userCells.map((cell) => {
            
            if(cell === userCells[userCellIndex - selectedShipId + i]) {
              props.setUserTakenShips(props.userTakenShips + 1)
              cell.ClassName = `user-cell taken ${shipClass}`
            }
            return cell
          })
        )
       } 
       else return 
    }
  } else if (isVertical) {
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
      if(ShipLastIdOnBoardVertical < 100 && ShipLastIdOnBoardVertical > row * (dragedShipCells.length - 1) && !userCells[(userCellIndex - row * selectedShipId)+ row * i].ClassName.includes('taken')) {
        console.log(userCells[(userCellIndex - row * selectedShipId)+ row * i].ClassName.includes('taken'))
        setUserCells(
          userCells.map((cell) => {
            if(cell === userCells[(userCellIndex - row * selectedShipId)+ row * i]) {
              props.setUserTakenShips(props.userTakenShips + 1)
              cell.ClassName = `user-cell taken ${shipClass}`
            } 
            return cell
          })
        )
      }
      else return 
    }
  } else {
  return 
  }
  // remove ship from ship list
  if(!dragedShip.className.includes('hide')) dragedShip.className = `${dragedShip.className} hide`;
  setIsVertical(false)
  } else {
    setDragedShip(null);
  }
  
}


function dragEndHandler(e) {
  console.log('drag end')
}



function revealUserCell() {
  props.setTurn('user');
  let random = Math.floor(userCells.length * Math.random());
 
    if(!userCells[random].ClassName.includes('damaged') && !userCells[random].ClassName.includes('missed')) {
      // setUserCells(
      //   userCells.map((cell, i) => {
      //     if(cell === userCells[random]) cell.ClassName = `${cell.ClassName} damaged`
      //     return cell
      //   })
      // )
      if(userCells[random].ClassName.includes('destroyer')) props.setComputerCountDestroyer(props.computerCountDestroyer +1)
      if(userCells[random].ClassName.includes('submarine')) props.setComputerCountSubmarine(props.computerCountSubmarine +1)
      if(userCells[random].ClassName.includes('battleship')) props.setComputerCountBattleship(props.computerCountBattleship +1)
      if(userCells[random].ClassName.includes('carrier')) props.setComputerCountCarrier(props.computerCountCarrier +1)

      if(userCells[random].ClassName.includes('taken')) {
      setUserCells(
        userCells.map((cell) => {
          if(cell === userCells[random]) cell.ClassName = `${cell.ClassName} damaged`
          return cell
        })
      )
      } else {
        setUserCells(
          userCells.map((cell) => {
            if(cell === userCells[random]) cell.ClassName = `${cell.ClassName} missed`
            return cell
          })
        )
      }
    } 
      else  revealUserCell()
      
      // return
    
}

// function getWinner() {
      
// }

if(props.turn === 'computer' && !props.gameOver && props.startGame || props.turn === 'computer' && !props.restart && props.startGame) setTimeout (revealUserCell, 1600) 

  return (
    <div className="user-battleground">
      <div className="user-cells-container">
        {userCells.map((user,i) => 
        <div 
          className={user.ClassName} 
          key={i} 
          id={`userCell-${i}`}
          // onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDragEnter={(e) => dragEnterHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDrop={(e) => dragDropHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          // onMouseUp={(e) => setDragedShip(null)}
          // ref={(element) => Refs.current.push(element)}
          >{user.content}
        </div>)}
      </div>
      <ShipList
        restart = {props.restart}
        gameOver = {props.gameOver}
        selectedCellId = {shipCellId => setShipCellId(shipCellId)} 
        getDragedShip = {dragedShip => setDragedShip(dragedShip)}
        getIsVertical = {isVertical => setIsVertical(isVertical)}
        //  getDragedShipLength = {dragedShipLength => setDragedShipLength(dragedShipLength)}
      />
    </div>
  )
}




export default UserBattleground; 