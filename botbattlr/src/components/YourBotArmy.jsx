import BotCard from './BotCard';

function YourBotArmy({ bots, onRelease, onDischarge }) {
  return (
    <div className="army">
      <h2>Your Bot Army</h2>
      <div className="bot-grid">
        {bots.map(bot => (
          <BotCard
            key={bot.id}
            bot={bot}
            isEnlisted={true}
            onClick={() => onRelease(bot.id)}
            onDischarge={onDischarge}
          />
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;