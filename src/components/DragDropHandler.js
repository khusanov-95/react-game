function DragDropHandler(e,shipCellId,dragedShip,setDragedShip,isVertical,setIsVertical,userCells,setUserCells,row,props, playDrop){
  if(dragedShip !== null && dragedShip.className.includes('ship')) {
  //1)initialize which ship cells are taken, 2)id of ship cells, 3)class of ship, 
  // 4)id of cell ship is droped, 5)id of last ship cell, 6)id of cell where last ship cell was droped,
  // 7) ship id, id of last ship cell if its vertical
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
  // horizontal part of logic (!isVertical if check logic) was partially taken from https://github.com/kubowania/battleships/blob/master/public/singleplayer.html
  if(!isVertical && !ShipNotAllowedHorizontal.includes(ShipLastIdOnBoard)) {
    //loop through ship cell
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
      //if cell id on where ship last id was droped is < total number of cells, and if ship cells are not taken => and taken class to the cell
       if(ShipLastIdOnBoard < 100 && !userCells[userCellIndex - selectedShipId + i].ClassName.includes('taken')) {
        setUserCells(
          userCells.map((cell) => {
            
            if(cell === userCells[userCellIndex - selectedShipId + i] && !userCells[ShipLastIdOnBoard].ClassName.includes('taken')) {
              props.setUserTakenShips(props.userTakenShips + 1)
              cell.ClassName = `user-cell taken ${shipClass}`
            }
            return cell
          })
        )
        playDrop();
       } 
       else return 
    }
  } else if (isVertical) {
    //lop throught ship cells
    for(let i = 0; i < dragedShip.childNodes.length; i++) {
      //if cell id on where ship last id was droped is < total number of cells, and if last id of ship cell will go out of board, and ship cells are no taken => add taken class
      if(ShipLastIdOnBoardVertical < 100 && ShipLastIdOnBoardVertical > row * (dragedShipCells.length - 1) && !userCells[(userCellIndex - row * selectedShipId)+ row * i].ClassName.includes('taken')) {
        setUserCells(
          userCells.map((cell) => {
            if(cell === userCells[(userCellIndex - row * selectedShipId)+ row * i] && !userCells[ShipLastIdOnBoardVertical].ClassName.includes('taken')) {
              props.setUserTakenShips(props.userTakenShips + 1)
              cell.ClassName = `user-cell taken ${shipClass}`
            } 
            return cell
          })
        )
        playDrop();
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
  
};

export default DragDropHandler