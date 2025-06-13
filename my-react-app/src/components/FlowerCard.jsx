    const FlowerCard = ({ flower, onDelete }) => {
  return (
    <div className="flower-card">
      <h3>{flower.name}</h3>
      <p><strong>💧 Полив:</strong> {flower.watering}</p>
      <p><strong>☀️ Освещение:</strong> {flower.light}</p>
      <p><strong>🌡️ Температура:</strong> {flower.temperature}</p>
      {flower.comment && (
        <p><strong>📝 Заметки:</strong> {flower.comment}</p>
      )}
      <button 
        onClick={() => onDelete(flower.id)}
        aria-label={`Удалить ${flower.name}`}
      >
        Удалить
      </button>
    </div>
  );
};

export default FlowerCard;