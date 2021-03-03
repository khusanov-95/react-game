 function GenerateShips(ship,computerCells,row) {
  let position;
  let randomPosition = Math.floor(Math.random() * ship.positions.length);
  let current = ship.positions[randomPosition];
  if(randomPosition === 0 ) position = 1;
  if(randomPosition === 1 ) position = 10;
  let randomStart = Math.abs(Math.floor(Math.random() * computerCells.length - (ship.positions[0].length * position)));
  
  let Taken = current.some(i => computerCells[randomStart + i].ClassName.includes('taken'));
  let AtRightEdge = current.some(i => (randomStart + i) % row === row - 1);
  let AtLeftEdge = current.some(i => (randomStart + i) % row === 0);
 

  if(!Taken && !AtRightEdge && !AtLeftEdge) {
    current.forEach(index => computerCells[randomStart + index].ClassName = `computer-cell taken ${ship.name} ship-cell`);

      }
  else {
    GenerateShips(ship,computerCells,row)
  }     
}

export default GenerateShips

