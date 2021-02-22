import React from 'react';
import ComputerBattleGround from './ComputerBattleground';
import UserBattleground from './UserBattleground';
import ShipsList from './ShipsList';

import './App.css'






const App = () => {
  return (
    <div className="container">
      <UserBattleground />
      <ComputerBattleGround />
      <ShipsList />
    </div>
  );
}





export default App; 