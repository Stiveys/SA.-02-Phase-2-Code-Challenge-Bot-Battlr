import BotCard from './BotCard';

function BotCollection({ bots, onAdd, armyBots }) {
  return (
    <div className="collection">
      <h2>Bot Collection</h2>
      <div className="bot-grid">
        {bots.map(bot => (
          <BotCard
            key={bot.id}
            bot={bot}
            isEnlisted={armyBots.some(b => b.id === bot.id)}
            onClick={() => onAdd(bot)}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;