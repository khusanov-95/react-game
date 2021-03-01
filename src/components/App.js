import React, {useState,useRef} from 'react';
import ComputerBattleGround from './ComputerBattleground';
import UserBattleground from './UserBattleground';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import './css/App.css'

let gameOver = false;
// let gameStart = 'notStarted';


function playGame() {
  if(gameOver) return
  // if(currentPlayer === 'user');
  console.log('123')
}

// function startGame() {
//   gameStart = 'started';
// }



const App = () => {
  const [gameStart, setGameStart] = useState('notStarted')
  let [turn, setTurn] = useState('user');

  const [countDestroyer, setCountDestroyer] = useState(0);
  const [countSubmarine, setCountSubmarine] = useState(0);
  const [countBattleship, setCountBattleship] = useState(0);
  const [countCarrier, setCountCarrier] = useState(0);

  const [computerCountDestroyer, setComputerCountDestroyer] = useState(0);
  const [computerCountSubmarine, setComputerCountSubmarine] = useState(0);
  const [computerCountBattleship, setComputerCountBattleship] = useState(0);
  const [computerCountCarrier, setComputerCountCarrier] = useState(0);


 

  if(countDestroyer + countSubmarine + countBattleship + countCarrier === 20) {
    gameOver = true;
    console.log(gameOver)
  }
  if(computerCountDestroyer + computerCountSubmarine + computerCountBattleship +  computerCountCarrier === 20) {
    gameOver = true;
  }

  const handle = useFullScreenHandle();

  return (
    <div >
      {
        gameStart === 'started' ? (
          <FullScreen handle={handle}>
            <div className="container">
            <UserBattleground 
              turn={turn} setTurn={setTurn}
              gameOver={gameOver}
              computerCountDestroyer={computerCountDestroyer}  setComputerCountDestroyer={setComputerCountDestroyer}
              computerCountSubmarine={computerCountSubmarine} setComputerCountSubmarine={setComputerCountSubmarine}
              computerCountBattleship={computerCountBattleship} setComputerCountBattleship={setComputerCountBattleship}
              computerCountCarrier={computerCountCarrier} setComputerCountCarrier={setComputerCountCarrier}
              />
            <ComputerBattleGround 
              turn={turn} setTurn={setTurn}
              gameOver={gameOver}
              countDestroyer={countDestroyer}  setCountDestroyer={setCountDestroyer}
              countSubmarine={countSubmarine} setCountSubmarine={setCountSubmarine}
              countBattleship={countBattleship} setCountBattleship={setCountBattleship}
              countCarrier={countCarrier} setCountCarrier={setCountCarrier}
              /> 
            <div>
              {countDestroyer === 4 ? (console.log('destroyer is done')) : ('')}
              {countSubmarine === 6 ? (console.log('destroyer is done')) : ('')}
              {countBattleship === 6 ? (console.log('destroyer is done')) : ('')}
              {countCarrier === 4 ? (console.log('destroyer is done')) : ('')}
              {computerCountDestroyer === 4 ? (console.log('Computer destroyer is done')) : ('')}
              {computerCountSubmarine === 6 ? (console.log('Computer destroyer is done')) : ('')}
              {computerCountBattleship === 6 ? (console.log('Computer destroyer is done')) : ('')}
              {computerCountCarrier === 4 ? (console.log('Computer destroyer is done')) : ('')}
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
          </div>
          </FullScreen>
        ) : (
          <div className="container">
            <div className="starting-page">
              <div className="starting-page__inner">
              <h2>Battle ship</h2>
                <div>
                  <div className="starting-divage__btn"><button onClick={() => setGameStart('started')}>Single Player</button></div>
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