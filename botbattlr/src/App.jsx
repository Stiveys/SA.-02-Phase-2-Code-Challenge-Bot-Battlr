import { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [armyBots, setArmyBots] = useState([]);
  const [sort, setSort] = useState(''); // New state to store the current sort option

  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bots');
        return res.json();
      })
      .then(data => setBots(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const addToArmy = (bot) => {
    if (!armyBots.some(b => b.id === bot.id)) {
      setArmyBots([...armyBots, bot]);
    }
  };

  const releaseFromArmy = (botId) => {
    setArmyBots(armyBots.filter(b => b.id !== botId));
  };

  const dischargeBot = (botId) => {
    fetch(`http://localhost:8001/bots/${botId}`, { method: 'DELETE' })
      .then(() => {
        setBots(bots.filter(b => b.id !== botId));
        setArmyBots(armyBots.filter(b => b.id !== botId));
      });
  };

  const handleSort = (option) => {
    setSort(option);
  };

  const sortedBots = () => {
    switch (sort) {
      case 'damage':
        return bots.sort((a, b) => b.damage - a.damage);
      case 'armor':
        return bots.sort((a, b) => b.armor - a.armor);
      case 'health':
        return bots.sort((a, b) => b.health - a.health);
      default:
        return bots;
    }
  };

  return (
    <div className="app">
      <h1>Bot Battlr</h1>
      <div className="filter-bar">
        <button className="sort-button" onClick={() => handleSort('damage')}>Sort by Damage</button>
        <button className="sort-button" onClick={() => handleSort('armor')}>Sort by Armor</button>
        <button className="sort-button" onClick={() => handleSort('health')}>Sort by Health</button>
      </div>
      <YourBotArmy
        bots={armyBots}
        onRelease={releaseFromArmy}
        onDischarge={dischargeBot}
      />
      <BotCollection
        bots={sortedBots()}
        onAdd={addToArmy}
        armyBots={armyBots}
      />
    </div>
  );
}

export default App;