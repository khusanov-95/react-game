import React, {useState,useRef} from 'react';
import ComputerBattleGround from './ComputerBattleground';
import UserBattleground from './UserBattleground';


import './css/App.css'

let gameOver = false;
// let turn = 'user';


function playGame() {
  if(gameOver) return
  // if(currentPlayer === 'user');
  console.log('123')
}



const App = () => {
  let [turn, setTurn] = useState('user')
console.log(turn)
//   const [countDestroyer, setCountDestroyer] = useState(0)
//   const [countSubmarine, setCountSubmarine] = useState(0)
//   const [countBattleship, setCountBattleship] = useState(0)
//   const [countCarrier, setCountCarrier] = useState(0)




  return (
    <div className="container">
      <ComputerBattleGround 
      turn={turn} setTurn={setTurn}
      gameOver={gameOver}

      // countDestroyer={countDestroyer} setCountDestroyer={setCountDestroyer}
      // countSubmarine={countSubmarine} setCountSubmarine={setCountSubmarine}
      // countBattleship={countBattleship} setCountBattleship={setCountBattleship}
      // countCarrier={countCarrier} setCountCarrier={setCountCarrier}
      /> 
      <UserBattleground 
      turn={turn} setTurn={setTurn}
      gameOver={gameOver}
      />
      <div></div>
      <button onClick={() => playGame()}>Start Game</button>
    </div>
  );
}

export default App; 