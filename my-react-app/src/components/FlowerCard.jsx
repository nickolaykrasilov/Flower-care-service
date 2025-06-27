import { FaTint, FaSun, FaThermometerHalf, FaComment } from 'react-icons/fa';
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
      <div className="flower-properties">
        {/* Name - зеленая правая часть */}
        <div className="flower-property">
          <div className="property-prefix">
            <span className="property-label">Name:</span>
          </div>
          <div className="property-content name-value">
            {flower.name || 'Untitled'}
          </div>
        </div>

        {/* Watering - голубая левая часть */}
        <div className="flower-property">
          <div className="property-prefix watering-prefix">
            <FaTint className="property-icon" />
            <span className="property-label">Watering:</span>
          </div>
          <div className="property-content">
            {flower.watering_intensity || 'Not specified'}
          </div>
        </div>

        {/* Light level - желтая левая часть */}
        <div className="flower-property">
          <div className="property-prefix light-level-prefix">
            <FaSun className="property-icon" />
            <span className="property-label">Light level:</span>
          </div>
          <div className="property-content">
            {flower.light_level || 'Not specified'}
          </div>
        </div>

        {/* Temperature - обычная строка */}
        <div className="flower-property">
          <div className="property-prefix">
            <FaThermometerHalf className="property-icon" />
            <span className="property-label">Temperature:</span>
          </div>
          <div className="property-content">
            {formatTemperature(flower.temperature_range)}
          </div>
        </div>
      </div>

      {/* Note section */}
      {flower.comment && (
        <div className="flower-note">
          <FaComment className="note-icon" />
          <p className="note-text">{flower.comment}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flower-actions">
        <button 
          className="action-button" 
          onClick={() => onEdit(flower)}
        >
          Edit
        </button>
        <button 
          className="action-button" 
          onClick={() => onDelete(flower.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FlowerCard;