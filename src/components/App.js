import React,{useState} from 'react';
import ComputerBattleGround from './ComputerBattleground';
import UserBattleground from './UserBattleground';


import './css/App.css'

let gameOver = true;
let currentPlayer = 'user';

function playGame() {
  // if(gameOver) return
  // if(currentPlayer === 'user');
  console.log('123')
}



const App = () => {

//   const [countDestroyer, setCountDestroyer] = useState(0)
//   const [countSubmarine, setCountSubmarine] = useState(0)
//   const [countBattleship, setCountBattleship] = useState(0)
//   const [countCarrier, setCountCarrier] = useState(0)




  return (
    <div className="container">
      <ComputerBattleGround 
      turn={currentPlayer === 'user' ? 'userTurn' : 'computerTurn'}

      // countDestroyer={countDestroyer} setCountDestroyer={setCountDestroyer}
      // countSubmarine={countSubmarine} setCountSubmarine={setCountSubmarine}
      // countBattleship={countBattleship} setCountBattleship={setCountBattleship}
      // countCarrier={countCarrier} setCountCarrier={setCountCarrier}
      />
      <UserBattleground />
      <div>{currentPlayer === 'user' ? 'Your turn' : 'Computers turn'}</div>
      <button onClick={() => playGame()}>Start Game</button>
    </div>
  );
}

export default App; 