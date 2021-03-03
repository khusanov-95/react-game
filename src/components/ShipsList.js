import React, {useState} from 'react';
import './css/ShipList.css';

const ShipsList = (props) => {

const [isRotated, setRotation] = useState(false)

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

function dragStart(e) {
  console.log(e.target)
  if(e.target.className.includes('ship') ) {
    props.getDragedShip(e.target)
  } else {
    props.getDragedShip(e.target.parentNode)
  }
  // setTimeout(() => {  
  //   e.target.style.display = "none";
  // },0); // in order to hide ship when its dragged
}

function destroyer(pos) {
  return(
    <div
    
    className={`destroyer ship ${props.restart ? 'show' : ''}`}
    draggable={true}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart}
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
    onDoubleClick={rotateShip}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart} // or children
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
    onDoubleClick={rotateShip}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart}
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
    onDoubleClick={rotateShip}
    onMouseDown={(e) => props.selectedCellId(e.target.id)}
    onDragStart={dragStart} 
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