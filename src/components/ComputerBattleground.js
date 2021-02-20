import React from 'react';
import './ComputerBattleground.css'

const ComputerBattleGround = ({cells}) => {
  return (
    <div className="computer-cells-container">
      {cells}
    </div>
  )
}



export default ComputerBattleGround; 