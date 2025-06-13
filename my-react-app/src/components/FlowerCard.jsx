import { FaEdit, FaTrash, FaTint, FaSun, FaThermometerHalf, FaComment } from 'react-icons/fa';
import '../styles/FlowerCard.css';

const FlowerCard = ({ flower, onDelete, onEdit }) => {
  return (
    <div className="flower-card">
      <div className="flower-card-header">
        <h3 className="flower-card-title">{flower.name}</h3>
        <div className="flower-card-actions">
          <button 
            onClick={() => onEdit(flower)} 
            className="flower-card-button edit-button"
            aria-label="Редактировать"
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => onDelete(flower.id)} 
            className="flower-card-button delete-button"
            aria-label="Удалить"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flower-properties">
        <div className="flower-property">
          <FaTint className="property-icon" />
          <span><strong>Полив:</strong> {flower.watering}</span>
        </div>
        <div className="flower-property">
          <FaSun className="property-icon" />
          <span><strong>Освещение:</strong> {flower.light}</span>
        </div>
        <div className="flower-property">
          <FaThermometerHalf className="property-icon" />
          <span><strong>Температура:</strong> {flower.temperature}</span>
        </div>
      </div>

      {flower.comment && (
        <div className="flower-comment">
          <FaComment className="comment-icon" />
          <span>{flower.comment}</span>
        </div>
      )}
    </div>
  );
};

export default FlowerCard;