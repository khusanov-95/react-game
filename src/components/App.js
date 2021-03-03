import React, {useState} from 'react';
import ComputerBattleGround from './ComputerBattleground';
import UserBattleground from './UserBattleground';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import './css/App.css'

let gameOver = false;
let winner = '';
console.log(gameOver)
const App = () => {
  const [openGame, setOpenGame] = useState('notStarted');
  const [startGame, setStartGame] = useState(false);
  const [turn, setTurn] = useState('user');
  const [userTakenShips, setUserTakenShips] = useState(0);


  const [countDestroyer, setCountDestroyer] = useState(0);
  const [countSubmarine, setCountSubmarine] = useState(0);
  const [countBattleship, setCountBattleship] = useState(0);
  const [countCarrier, setCountCarrier] = useState(0);

  const [computerCountDestroyer, setComputerCountDestroyer] = useState(0);
  const [computerCountSubmarine, setComputerCountSubmarine] = useState(0);
  const [computerCountBattleship, setComputerCountBattleship] = useState(0);
  const [computerCountCarrier, setComputerCountCarrier] = useState(0);


  const [restart, setRestart] = useState(false);

  if(countDestroyer + countSubmarine + countBattleship + countCarrier === 20) {
    gameOver = true;
    winner = 'user';
  }
  if(computerCountDestroyer + computerCountSubmarine + computerCountBattleship +  computerCountCarrier === 20) {
    gameOver = true;
    winner = 'computer';
  }
  console.log(countDestroyer,countSubmarine,countBattleship,countCarrier)
 
  const handle = useFullScreenHandle();
  function startTheGame() {
    if(userTakenShips % 10 === 0) {
      setStartGame(true);
      // setRestart(false);
    } else alert('Set all your ships to start a battle');
  }
  function handleStartAgainBtn(e) {
  setCountDestroyer(0);
  setCountSubmarine(0);
  setCountBattleship(0);
  setCountCarrier(0);
  setComputerCountDestroyer(0);
  setComputerCountSubmarine(0);
  setComputerCountBattleship(0);
  setComputerCountCarrier(0);
    setRestart(true);
    gameOver = false;
    setTurn('user');
    setStartGame(false);
    e.target.parentNode.style.display="none";
    setTimeout(() => {
      setRestart(false);
    },0); 
  }
  return (
    <div >
      {
        openGame === 'started' ? (
          <FullScreen handle={handle}>
            <div className="container">
              <div className="turn">
                <span>
                  {
                    startGame ? (turn === 'user' ? (<i className="fas fa-user"></i>) : (<i className="fas fa-robot"></i>)) : ('Prepare your ships and start the battle!')
                  }
                </span>
              </div>
              <UserBattleground 
                turn={turn} setTurn={setTurn}
                gameOver={gameOver} 
                startGame={startGame}
                userTakenShips={userTakenShips} setUserTakenShips={setUserTakenShips}
                computerCountDestroyer={computerCountDestroyer}  setComputerCountDestroyer={setComputerCountDestroyer}
                computerCountSubmarine={computerCountSubmarine} setComputerCountSubmarine={setComputerCountSubmarine}
                computerCountBattleship={computerCountBattleship} setComputerCountBattleship={setComputerCountBattleship}
                computerCountCarrier={computerCountCarrier} setComputerCountCarrier={setComputerCountCarrier}
                restart={restart} setRestart={setRestart}
                />
              <ComputerBattleGround 
                turn={turn} setTurn={setTurn}
                gameOver={gameOver}
                startGame={startGame}
                countDestroyer={countDestroyer}  setCountDestroyer={setCountDestroyer}
                countSubmarine={countSubmarine} setCountSubmarine={setCountSubmarine}
                countBattleship={countBattleship} setCountBattleship={setCountBattleship}
                countCarrier={countCarrier} setCountCarrier={setCountCarrier}
                restart={restart}
                /> 
              {/* <div>
                {countDestroyer === 4 ? (console.log('destroyer is done')) : ('')}
                {countSubmarine === 6 ? (console.log('destroyer is done')) : ('')}
                {countBattleship === 6 ? (console.log('destroyer is done')) : ('')}
                {countCarrier === 4 ? (console.log('destroyer is done')) : ('')}
                {computerCountDestroyer === 4 ? (console.log('Computer destroyer is done')) : ('')}
                {computerCountSubmarine === 6 ? (console.log('Computer destroyer is done')) : ('')}
                {computerCountBattleship === 6 ? (console.log('Computer destroyer is done')) : ('')}
                {computerCountCarrier === 4 ? (console.log('Computer destroyer is done')) : ('')}
              </div> */}
              <div>
                {startGame ? ('') : (<button className="start-battle-btn" onClick={startTheGame}>Start Battle</button>)}
              </div>
              <div>
                {handle.active ? ('') : (<button className="expand-btn" onClick={handle.enter}><i className="fas fa-expand-arrows-alt"></i></button>)}     
              </div>
              <footer className="footer">
                <div className="footer__inner">
                <div><a href="https://github.com/khusanov-95"><i className="fab fa-github-square"></i></a></div>
                <div>2021</div>
                <div><a href="https://rs.school/js/"><img src="rs_school_js.svg" alt="rs-school"/></a></div>
                </div>
              </footer>
                <div className="game-over-container" style={gameOver ? {display:"flex"} : {display:"none"}}>

                  <div className="winner">
                    <h2>
                      {winner === 'user' ? ("You've won") : ("You've lost")}
                    </h2>
                  </div>
                  <button className="startAgain-btn" onClick={(e) => handleStartAgainBtn(e)}>Try again</button>
                </div>     
            </div>
          </FullScreen>
        ) : (
          <div className="container">
            <div className="starting-page">
              <div className="starting-page__inner">
              <h2>Battle ship</h2>
                <div>
                  <div className="starting-page__btn"><button onClick={() => setOpenGame('started')}>Single Player</button></div>
                  <div className="notebook-line"></div>
                  <div className="notebook-line"></div>
                  <div className="notebook-line"></div>
                  <div className="notebook-line"></div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
    
  );
}

export default App; 