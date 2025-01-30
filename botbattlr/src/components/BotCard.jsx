function BotCard({ bot, isEnlisted, onClick, onDischarge }) {
  // Function to handle click events on the bot card
  const handleClick = () => {
    if (!isEnlisted) { // Check if the bot is not enlisted
      onClick(); // Call the onClick function to enlist the bot
    }
  };

  // Rendering the bot card
  return (
    <div className={`bot-card ${isEnlisted ? 'enlisted' : ''}`} onClick={handleClick}>
      <img src={bot.avatar_url} alt={bot.name} /> {/* Display the bot's avatar */}
      <div className="bot-info">
        <h3>{bot.name}</h3> {/* Display the bot's name */}
        <p><strong>Class:</strong> {bot.bot_class}</p> {/* Display the bot's class */}
        <div className="stats">
          <span>❤️{bot.health}</span> {/* Display the bot's health */}
          <span>⚔️{bot.damage}</span> {/* Display the bot's damage */}
          <span>🛡️{bot.armor}</span> {/* Display the bot's armor */}
        </div>
      </div>
      {onDischarge && ( // Conditionally render the discharge button if onDischarge is provided
        <button
          className="discharge-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the parent element
            onDischarge(bot.id); // Call the onDischarge function with the bot's ID
          }}
        >
          x {/* Discharge button icon */}
        </button>
      )}
    </div>
  );
}

export default BotCard; // Exporting the BotCard component as the default export