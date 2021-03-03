import React ,{useState, useEffect} from 'react';
import ShipList from './ShipsList';
import DragDropHandler from './DragDropHandler'
import useSound from 'use-sound';
import shipDestroyedSound from '../sounds/damage.mp3';
import blop from '../sounds/blop.mp3';
import drop from '../sounds/drop.mp3';

import './css/App.css';
import './css/ShipList.css';

const UserBattleground = (props) => {
  //initialize cell row, ship cell id, get draged ship from shiplist.js, create 100 cells
  let row = 10;
  const [shipCellId, setShipCellId] = useState('');
  const [dragedShip, setDragedShip] = useState(null);
  const [isVertical, setIsVertical] = useState(false);
  const [userCells, setUserCells] = useState(Array.from( new Array(100), function() { return {ClassName: 'user-cell', content: '',}} ));
  const [playDamage] = useSound(
    shipDestroyedSound,
    {volume: props.soundVolume ? (0.5) : (0)}
  )
  const [playBlop] = useSound(
    blop,
    {volume: props.soundVolume ? (0.5) : (0)}
  )
  const [playDrop] = useSound(
    drop,
    {volume: props.soundVolume ? (0.4) : (0)}
  )
  //if game is restarted recreate cells
  if(props.restart) {
    userCells.map(cell => cell.ClassName = 'user-cell');
  }


function revealUserCell() {
  if(props.turn === 'computer') {
    props.setTurn('user');
    let random = Math.floor(userCells.length * Math.random());

    if(!userCells[random].ClassName.includes('damaged') && !userCells[random].ClassName.includes('missed')) {

      if(userCells[random].ClassName.includes('destroyer')) props.setComputerCountDestroyer(props.computerCountDestroyer +1)
      if(userCells[random].ClassName.includes('submarine')) props.setComputerCountSubmarine(props.computerCountSubmarine +1)
      if(userCells[random].ClassName.includes('battleship')) props.setComputerCountBattleship(props.computerCountBattleship +1)
      if(userCells[random].ClassName.includes('carrier')) props.setComputerCountCarrier(props.computerCountCarrier +1)

      if(userCells[random].ClassName.includes('taken')) {
      setUserCells(
        userCells.map((cell) => {
          if(cell === userCells[random]) cell.ClassName = `${cell.ClassName} damaged`;
          return cell
        })
      )
      playDamage();
      } else {
        setUserCells(
          userCells.map((cell) => {
            if(cell === userCells[random]) cell.ClassName = `${cell.ClassName} missed`
            return cell
          })
        )
        playBlop();
      }
    } else  revealUserCell()
  }  
}

useEffect(() => {
  if(!props.gameOver && props.startGame|| !props.restart && props.startGame) {
  setTimeout(() => {
    revealUserCell();
  }, 1000)
}
},[props.turn])

  return (
    <div className="user-battleground">
      <div className="user-cells-container">
        {userCells.map((user,i) => 
        <div 
          className={user.ClassName} 
          key={i} 
          id={`userCell-${i}`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDrop={(e) => DragDropHandler(e,shipCellId,dragedShip,setDragedShip,isVertical,setIsVertical,userCells,setUserCells,row,props, playDrop)} // from DragDropHandler.js
          onDragEnd={(e) => e.preventDefault}
          >{user.content}
        </div>)}
      </div>
      <ShipList
        restart = {props.restart}
        gameOver = {props.gameOver}
        selectedCellId = {shipCellId => setShipCellId(shipCellId)} 
        getDragedShip = {dragedShip => setDragedShip(dragedShip)}
        getIsVertical = {isVertical => setIsVertical(isVertical)}
      />
    </div>
  )
}

export default UserBattleground; 