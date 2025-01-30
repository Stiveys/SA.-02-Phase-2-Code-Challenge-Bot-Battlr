import BotCard from './BotCard'; // Importing the BotCard component

function BotCollection({ bots, onAdd, armyBots }) {
  // Rendering the BotCollection component
  return (
    <div className="collection">
      <h2>Bot Collection</h2> {/* Title of the bot collection section */}
      <div className="bot-grid">
        {bots.map(bot => (
          // Mapping over the list of bots to render each one as a BotCard
          <BotCard
            key={bot.id} // Unique key for each bot card
            bot={bot} // Passing the bot object as a prop
            isEnlisted={armyBots.some(b => b.id === bot.id)} // Checking if the bot is enlisted in the army
            onClick={() => onAdd(bot)} // Passing the function to add the bot to the army
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection; // Exporting the BotCollection component as the default export