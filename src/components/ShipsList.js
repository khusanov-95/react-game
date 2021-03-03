import React, {useState} from 'react';
import './css/ShipList.css';

const ShipsList = (props) => {

const [isRotated, setRotation] = useState(false)

//rotate ship on doubleclick
function rotateShip(e) {
  setRotation(!isRotated);
  if(isRotated) {
    e.target.parentNode.style.display = 'inline-block';
    e.target.parentNode.style.width = '33px';
    props.getIsVertical(isRotated);
  } else {
    e.target.parentNode.style.display = 'flex'
    e.target.parentNode.style.width = '';
    props.getIsVertical(isRotated);
  }  
}
//get draged ship and send it to UserBattleground.js
function dragStart(e) {
  if(e.target.className.includes('ship') ) {
    props.getDragedShip(e.target)
  } else {
    props.getDragedShip(e.target.parentNode)
  }
}
// create 4 types of ships
function destroyer(pos) {
  return(
    <div
    className={`destroyer ship ${props.restart ? 'show' : ''}`}
    draggable={true}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart}
    onDragEnd={() => props.getDragedShip(null)}
    >
      <div id={`destroyer-${pos}-0`} ></div>
    </div>
  );
}
function submarine(pos) {
  return(
    <div
    style={props.gameOver ? {display: "flex", width: ""} : {}} 
    className={`submarine ship ${props.restart ? 'show' : ''}`} 
    draggable={true} 
    onClick={rotateShip}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart}
    onDragEnd={() => props.getDragedShip(null)}
    >
      <div id={`submarine-${pos}-0` }></div>
      <div id={`submarine-${pos}-1` }></div>
    </div>
  );
}
function battleship(pos) {
  return(
    <div
    style={props.gameOver ? {display: "flex", width: ""} : {}} 
    className={`battleship ship ${props.restart ? 'show' : ''}`} 
    draggable={true} 
    onClick={rotateShip}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart}
    onDragEnd={(e) => props.getDragedShip(null)}
     >
      <div id={`battleship-${pos}-0`}></div>
      <div id={`battleship-${pos}-1`}></div>
      <div id={`battleship-${pos}-2`}></div>
    </div>
  );
}
function carrier(pos) {
  return(
    <div
    style={props.gameOver ? {display:"flex", width: ""} : {}} 
    className={`carrier ship ${props.restart ? 'show' : ''}`}
    draggable={true} 
    onClick={rotateShip}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart}
    onDragEnd={(e) => props.getDragedShip(null)} 
    >
      <div id={`carrier-${pos}-0`}></div>
      <div id={`carrier-${pos}-1`}></div>
      <div id={`carrier-${pos}-2`}></div>
      <div id={`carrier-${pos}-3`}></div>
    </div>
  );
}
  return (
    <div className="ship-list">
      <div className="destroyer-container ship-container">
        {destroyer('a')}
        {destroyer('b')}
        {destroyer('c')}
        {destroyer('d')}
      </div>
      <div className="submarine-container ship-container">
        {submarine('a')}
        {submarine('b')}
        {submarine('c')}
      </div>
      <div className="battleship-container ship-container"> 
        {battleship('a')}
        {battleship('b')}
      </div>
      <div className="carrier-container ship-container"> 
        {carrier('a')}
      </div>
    </div>
  );
};

export default ShipsList; 