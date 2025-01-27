function BotCard({ bot, isEnlisted, onClick, onDischarge }) {
    const handleClick = () => {
      if (!isEnlisted) {
        onClick();
      }
    };

    return (
      <div className={`bot-card ${isEnlisted ? 'enlisted' : ''}`} onClick={handleClick}>
        <img src={bot.avatar_url} alt={bot.name} />
        <div className="bot-info">
          <h3>{bot.name}</h3>
          <p><strong>Class:</strong> {bot.bot_class}</p>
          <div className="stats">
            <span>❤️{bot.health}</span>
            <span>⚔️{bot.damage}</span>
            <span>🛡️{bot.armor}</span>
          </div>
        </div>
        {onDischarge && (
          <button
            className="discharge-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDischarge(bot.id);
            }}
          >
            x
          </button>
        )}
      </div>
    );
  }

  export default BotCard;