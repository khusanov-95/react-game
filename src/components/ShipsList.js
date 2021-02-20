import React from 'react';
import './ShipList.css';

const ShipsList = ({row,cells}) => {

  return (
    <div className="ship-list">
      <div>
        {destroyer('first')}
        {destroyer('second')}
        {destroyer('third')}
        {destroyer('fourth')}
      </div>
      <div>
        {submarine('first')}
        {submarine('second')}
        {submarine('third')}
      </div>
      <div> 
        {battleship('first')}
        {battleship('second')}
        {carrier(carrier)}
      </div>
    </div>
  );
};

function destroyer(pos) {
  return(
    <div className="destroyer ship" draggable={true}>
      <div id={`destroyer-0-${pos}`}></div>
    </div>
  );
}
function submarine(pos) {
  return(
    <div className="submarine ship" draggable={true}>
      <div id={`submarine-0-${pos}`}></div>
      <div id={`submarine-1-${pos}`}></div>
    </div>
  );
}
function battleship(pos) {
  return(
    <div className="battleship ship" draggable={true}>
      <div id={`battleship-0-${pos}`}></div>
      <div id={`battleship-1-${pos}`}></div>
      <div id={`battleship-2-${pos}`}></div>
    </div>
  );
}
function carrier() {
  return(
    <div className="carrier ship" draggable={true}>
      <div id="carrier-0"></div>
      <div id="carrier-1"></div>
      <div id="carrier-2"></div>
      <div id="carrier-3"></div>
    </div>
  );
}







export default ShipsList; 