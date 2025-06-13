import { FaEdit, FaTrash, FaTint, FaSun, FaThermometerHalf, FaComment } from 'react-icons/fa';
import '../styles/FlowerCard.css';

const FlowerCard = ({ flower, onDelete, onEdit }) => {
  return (
    <div className="flower-card">
      {/* Шапка карточки */}
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

      {/* Свойства растения */}
      <div className="flower-properties">
        <div className="flower-property">
          <FaTint className="property-icon" />
          <span>Полив: {flower.watering}</span>
        </div>
        <div className="flower-property">
          <FaSun className="property-icon" />
          <span>Освещение: {flower.light}</span>
        </div>
        <div className="flower-property">
          <FaThermometerHalf className="property-icon" />
          <span>Температура: {flower.temperature}</span>
        </div>
      </div>

      {/* Комментарий */}
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