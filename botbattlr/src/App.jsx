import { useState, useEffect } from 'react'; // Importing necessary hooks from React
import BotCollection from './components/BotCollection'; // Importing the BotCollection component
import YourBotArmy from './components/YourBotArmy'; // Importing the YourBotArmy component
import './App.css'; // Importing the CSS file for styling

function App() {
  // State to hold the list of all bots
  const [bots, setBots] = useState([]);
  // State to hold the list of bots in the user's army
  const [armyBots, setArmyBots] = useState([]);
  // State to hold the current sorting option
  const [sort, setSort] = useState('');

  //  Fetches the bot list from an API when the component mounts.
  useEffect(() => {
    fetch('https://bots-si0g.onrender.com/bots') // Fetching bots from the API
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bots'); // Handling errors in fetching
        return res.json(); // Parsing the response as JSON
      })
      .then(data => setBots(data)) // Setting the fetched bots to the state
      .catch(error => console.error('Error:', error)); // Logging any errors that occur
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Adds a bot to the user's army if it's not already included.
  const addToArmy = (bot) => {
    if (!armyBots.some(b => b.id === bot.id)) { // Check if the bot is not already in the army
      setArmyBots([...armyBots, bot]); // Add the bot to the army
    }
  };

  //  Removes a bot from the army by filtering it out from the list.
  const releaseFromArmy = (botId) => {
    setArmyBots(armyBots.filter(b => b.id !== botId)); // Filter out the bot with the given ID
  };

  // Deletes a bot from both the main list and the army by making a DELETE request and updating the state.)
  const dischargeBot = (botId) => {
    fetch(`https://bots-si0g.onrender.com/bots/${botId}`, { method: 'DELETE' }) // Sending a DELETE request to the API
      .then(() => {
        setBots(bots.filter(b => b.id !== botId)); // Remove the bot from the main list
        setArmyBots(armyBots.filter(b => b.id !== botId)); // Remove the bot from the army
      });
  };

  //Updates the sorting criteria (e.g., damage, armor, health
  const handleSort = (option) => {
    setSort(option); // Set the sorting option in the state
  };

  // Returns a sorted list of bots based on the selected sorting option.
  const sortedBots = () => {
    switch (sort) {
      case 'damage':
        return bots.sort((a, b) => b.damage - a.damage); // Sort bots by damage in descending order
      case 'armor':
        return bots.sort((a, b) => b.armor - a.armor); // Sort bots by armor in descending order
      case 'health':
        return bots.sort((a, b) => b.health - a.health); // Sort bots by health in descending order
      default:
        return bots; // Return the original list if no sorting option is selected
    }
  };

  // Rendering the main App component
  return (
    <div className="app">
      <h1>Bot Battlr</h1> {/* Title of the application */}
      <div className="filter-bar">
        {/* Buttons to sort bots by different attributes */}
        <button className="sort-button" onClick={() => handleSort('damage')}>Sort by Damage</button>
        <button className="sort-button" onClick={() => handleSort('armor')}>Sort by Armor</button>
        <button className="sort-button" onClick={() => handleSort('health')}>Sort by Health</button>
      </div>
      {/* Component to display the user's army */}
      <YourBotArmy
        bots={armyBots} // Passing the list of army bots as a prop
        onRelease={releaseFromArmy} // Passing the function to release a bot from the army
        onDischarge={dischargeBot} // Passing the function to discharge a bot
      />
      {/* Component to display the collection of available bots */}
      <BotCollection
        bots={sortedBots()} // Passing the sorted list of bots as a prop
        onAdd={addToArmy} // Passing the function to add a bot to the army
        armyBots={armyBots} // Passing the list of army bots as a prop
      />
    </div>
  );
}

export default App; // Exporting the App component as the default export