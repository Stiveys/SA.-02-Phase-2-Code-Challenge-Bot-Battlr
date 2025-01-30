import BotCard from './BotCard'; // Importing the BotCard component

function YourBotArmy({ bots, onRelease, onDischarge }) {
  // Rendering the YourBotArmy component
  return (
    <div className="army">
      <h2>Your Bot Army</h2> {/* Title of the your bot army section */}
      <div className="bot-grid">
        {bots.map(bot => (
          // Mapping over the list of bots to render each one as a BotCard
          <BotCard
            key={bot.id} // Unique key for each bot card
            bot={bot} // Passing the bot object as a prop
            isEnlisted={true} // Indicating that the bot is enlisted in the army
            onClick={() => onRelease(bot.id)} // Passing the function to release the bot from the army
            onDischarge={onDischarge} // Passing the function to discharge the bot
          />
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy; // Exporting the YourBotArmy component as the default export