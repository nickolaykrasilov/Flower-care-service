import { FaEdit, FaTrash, FaTint, FaSun, FaThermometerHalf, FaComment } from 'react-icons/fa';
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
      <div className="flower-card-header">
        <h3>{flower.name || 'Untitled'}</h3>
        <div className="flower-actions">
          <button onClick={() => onEdit(flower)} aria-label="Edit">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(flower.id)} aria-label="Delete">
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flower-details">
        <div className="flower-property">
          <FaTint className="icon" />
          <span><strong>Watering:</strong> {flower.watering_intensity || 'Not specified'}</span>
        </div>
        <div className="flower-property">
          <FaSun className="icon" />
          <span><strong>Light level:</strong> {flower.light_level || 'Not specified'}</span>
        </div>
        <div className="flower-property">
          <FaThermometerHalf className="icon" />
          <span><strong>Temp</strong> {formatTemperature(flower.temperature_range)}</span>
        </div>
      </div>

      {flower.comment && (
        <div className="flower-comment">
          <FaComment className="icon" />
          <p>{flower.comment}</p>
        </div>
      )}
    </div>
  );
};

export default FlowerCard;