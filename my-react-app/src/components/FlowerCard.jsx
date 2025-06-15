import { FaEdit, FaTrash, FaTint, FaSun, FaThermometerHalf, FaComment } from 'react-icons/fa';
import '../styles/FlowerCard.css';

const FlowerCard = ({ flower, onDelete, onEdit }) => {
  const formatTemperature = (tempRange) => {
    if (!tempRange || (tempRange.min === null && tempRange.max === null)) {
      return 'Не указано';
    }
    
    const parts = [];
    if (tempRange.min !== null) parts.push(`от ${tempRange.min}°C`);
    if (tempRange.max !== null) parts.push(`до ${tempRange.max}°C`);
    
    return parts.join(' ') || 'Не указано';
  };

  if (!flower) return null;

  return (
    <div className="flower-card">
      <div className="flower-card-header">
        <h3>{flower.name || 'Без названия'}</h3>
        <div className="flower-actions">
          <button onClick={() => onEdit(flower)} aria-label="Редактировать">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(flower.id)} aria-label="Удалить">
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flower-details">
        <div className="flower-property">
          <FaTint className="icon" />
          <span><strong>Полив:</strong> {flower.watering_intensity || 'Не указано'}</span>
        </div>
        <div className="flower-property">
          <FaSun className="icon" />
          <span><strong>Освещение:</strong> {flower.light_level || 'Не указано'}</span>
        </div>
        <div className="flower-property">
          <FaThermometerHalf className="icon" />
          <span><strong>Температура:</strong> {formatTemperature(flower.temperature_range)}</span>
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