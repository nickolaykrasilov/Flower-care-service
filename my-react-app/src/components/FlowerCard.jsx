import '../styles/FlowerCard.css';

const FlowerCard = ({ flower, onDelete, onEdit }) => {
  const formatTemperature = (tempRange) => {
    if (!tempRange || (tempRange.min === null && tempRange.max === null)) {
      return 'Not specified';
    }
    
    const parts = [];
    if (tempRange.min !== null) parts.push(`From ${tempRange.min}°C`);
    if (tempRange.max !== null) parts.push(`to ${tempRange.max}°C`);
    
    return parts.join(' ') || 'Not specified';
  };

  if (!flower) return null;

  return (
    <div className="flower-card">
      <div className="property-rows">
        {/* Name Row */}
        <div className="property-row">
          <div className="property-prefix name-prefix">
            <span>🌿 Name:</span>
          </div>
          <div className="property-content name-content">
            {flower.name || 'Untitled'}
          </div>
        </div>

        {/* Watering Row */}
        <div className="property-row">
          <div className="property-prefix watering-prefix">
            <span>💦 Watering:</span>
          </div>
          <div className="property-content">
            {flower.watering_intensity || 'Not specified'}
          </div>
        </div>

        {/* Light Level Row */}
        <div className="property-row">
          <div className="property-prefix light-level-prefix">
            <span>☀️ Light level:</span>
          </div>
          <div className="property-content">
            {flower.light_level || 'Not specified'}
          </div>
        </div>

        {/* Temperature Row */}
        <div className="property-row">
          <div className="property-prefix temperature-prefix">
            <span>🌡 Temp:</span>
          </div>
          <div className="property-content">
            {formatTemperature(flower.temperature_range)}
          </div>
        </div>

        {/* Note Row */}
        {flower.comment && (
          <div className="property-row">
            <div className="property-prefix note-prefix">
              <span>✏️ Note:</span>
            </div>
            <div className="property-content note-content">
              {flower.comment}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="edit-btn" onClick={() => onEdit(flower)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(flower.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FlowerCard;