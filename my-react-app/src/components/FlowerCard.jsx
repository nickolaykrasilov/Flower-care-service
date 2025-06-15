import { FaEdit, FaTrash, FaTint, FaSun, FaThermometerHalf, FaComment } from 'react-icons/fa';
import '../styles/FlowerCard.css';

const FlowerCard = ({ flower, onDelete, onEdit }) => {
  // Функция для форматирования температурного диапазона
  const formatTemperature = (tempRange) => {
    if (!tempRange) return 'Не указано';
    const { min, max } = tempRange;
    if (min !== null && max !== null) return `${min}°C - ${max}°C`;
    if (min !== null) return `от ${min}°C`;
    if (max !== null) return `до ${max}°C`;
    return 'Не указано';
  };

  return (
    <div className="flower-card">
      {/* Заголовок карточки с кнопками */}
      <div className="flower-card-header">
        <h3 className="flower-card-title">{flower.name}</h3>
        <div className="flower-card-actions">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(flower);
            }}
            className="flower-card-button edit-button"
            aria-label="Редактировать"
          >
            <FaEdit size={14} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(flower.id);
            }}
            className="flower-card-button delete-button"
            aria-label="Удалить"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      {/* Свойства растения */}
      <div className="flower-properties">
        <div className="flower-property">
          <FaTint className="property-icon" />
          <span><strong>Полив:</strong> {flower.watering_intensity || 'Не указано'}</span>
        </div>
        <div className="flower-property">
          <FaSun className="property-icon" />
          <span><strong>Освещение:</strong> {flower.light_level || 'Не указано'}</span>
        </div>
        <div className="flower-property">
          <FaThermometerHalf className="property-icon" />
          <span><strong>Температура:</strong> {formatTemperature(flower.temperature_range)}</span>
        </div>
      </div>

      {/* Блок с комментарием */}
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