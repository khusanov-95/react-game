import React, {useState} from 'react';
import ComputerBattleGround from './ComputerBattleground';
import UserBattleground from './UserBattleground';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import useSound from 'use-sound';
import mainMusic from '../sounds/Pirates.mp3';
import gong from '../sounds/gong.mp3';

import './css/App.css'
import './css/ShipList.css'

let gameOver = false; 
let winner = '';

const App = () => {
  const [openGame, setOpenGame] = useState('notStarted'); // open game when single player clicked
  const [startGame, setStartGame] = useState(false); // start game when Start Battle clicked
  const [turn, setTurn] = useState('');//set turns
  const [userTakenShips, setUserTakenShips] = useState(0);// count ships droped on board

  //count destroyed ship cells of each type and each sides(computer,user)
      //count ships logic was partially taken from https://github.com/kubowania/battleships/blob/master/public/singleplayer.html
  const [countDestroyer, setCountDestroyer] = useState(0);
  const [countSubmarine, setCountSubmarine] = useState(0);
  const [countBattleship, setCountBattleship] = useState(0);
  const [countCarrier, setCountCarrier] = useState(0);
  const [computerCountDestroyer, setComputerCountDestroyer] = useState(0);
  const [computerCountSubmarine, setComputerCountSubmarine] = useState(0);
  const [computerCountBattleship, setComputerCountBattleship] = useState(0);
  const [computerCountCarrier, setComputerCountCarrier] = useState(0);
  const [restart, setRestart] = useState(false);// restarts the game
  const [settingsOpened, setSettingsOpened] = useState(false);

  const [volume, setVolume] = useState(false);
  const [soundVolume, setSoundVolume] = useState(false)

  const [playMain] = useSound(
    mainMusic,
    {volume: volume ? (0.5) : (0)}
    );
  const [playGong] = useSound(
    gong,
    {volume: soundVolume ? (0.5) : (0)}
  )
  //when all ships are destroyed => set the winner, finish the game
  if(countDestroyer + countSubmarine + countBattleship + countCarrier === 20) {
      gameOver = true;
      winner = 'user';
  
  }
  if(computerCountDestroyer + computerCountSubmarine + computerCountBattleship +  computerCountCarrier === 20) {
      gameOver = true;
      winner = 'computer';
  }
 
  const handle = useFullScreenHandle();// full screen handler

  function startTheGame() { // start game if all ships are droped on board
    if(userTakenShips === 10) {
      setStartGame(true);
      playGong();
      setTurn('user')
    } else alert('Set all your ships to start a battle');
  }

  function handleStartingPage() {
    setOpenGame('started');
    playMain();
    setInterval(() => {
      playMain();
    },28000);
  }

  function handleRestartAgainBtn(e) { // restar the game on click
    // set all ship cell count to 0  
    setCountDestroyer(0);
    setCountSubmarine(0);
    setCountBattleship(0);
    setCountCarrier(0);
    setComputerCountDestroyer(0);
    setComputerCountSubmarine(0);
    setComputerCountBattleship(0);
    setComputerCountCarrier(0);
    setUserTakenShips(0)
    // restart all cells and ships to default
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
                soundVolume={soundVolume}
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
                soundVolume={soundVolume}
                /> 
              <div>
                {startGame ? ('') : (<button className="start-battle-btn" onClick={startTheGame}>Start Battle</button>)}
              </div>
              <div className="sideOptions-container">
                {handle.active ? ('') : (<button className="expand-btn" onClick={handle.enter}><i className="fas fa-expand-arrows-alt"></i></button>)}
                <button className="settings" onClick={() => setSettingsOpened(true)}><i className="fas fa-cog"></i></button>
              </div>
              {settingsOpened ? (
                <div className="settings-container">
                  <button className="settings-close" onClick={() => setSettingsOpened(false)}><i className="fas fa-window-close"></i></button>
                  <div className="music-settings-container">
                  <span>Music :</span> <button className="sound-volume" onClick={() => setVolume(!volume)}>{volume ? (<i className="fas fa-volume-down"></i>) : (<i className="fas fa-volume-mute"></i>)}</button>     
                  </div>
                  <div className="music-settings-container">
                  <span>Sounds :</span> <button className="sound-volume" onClick={() => setSoundVolume(!soundVolume)}>{soundVolume ? (<i className="fas fa-volume-down"></i>) : (<i className="fas fa-volume-mute"></i>)}</button>     
                  </div>
                </div>
              ): ('')}
             
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
                  <button className="startAgain-btn" onClick={(e) => handleRestartAgainBtn(e)}>Try again</button>
                </div>     
            </div>
          </FullScreen>
        ) : (
          <div className="container">
            <div className="starting-page">
              <div className="starting-page__inner">
              <h2>Battle ship</h2>
                <div>
                  <div className="starting-page__btn"><button onClick={handleStartingPage}>Single Player</button></div>
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