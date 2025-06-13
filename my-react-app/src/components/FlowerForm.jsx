import { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import '../styles/FlowerForm.css';

const FlowerForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    watering: 'medium',
    light: 'partial',
    temperature: '18-25',
    comment: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        name: '',
        watering: 'medium',
        light: 'partial',
        temperature: '18-25',
        comment: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flower-form">
      <h2 className="form-title">
        {initialData ? (
          <>
            <FaEdit /> Редактировать растение
          </>
        ) : (
          <>
            <FaPlus /> Добавить растение
          </>
        )}
      </h2>

      <div className="form-group">
        <label>Название растения</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Например: Фикус Бенджамина"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Интенсивность полива</label>
          <select name="watering" value={formData.watering} onChange={handleChange}>
            <option value="low">Редкий</option>
            <option value="medium">Умеренный</option>
            <option value="high">Обильный</option>
          </select>
        </div>

        <div className="form-group">
          <label>Освещение</label>
          <select name="light" value={formData.light} onChange={handleChange}>
            <option value="shade">Тень</option>
            <option value="partial">Рассеянное</option>
            <option value="full">Прямое</option>
          </select>
        </div>

        <div className="form-group">
          <label>Температура, °C</label>
          <input
            type="text"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="18-25"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Дополнительные заметки</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Особенности ухода, предпочтения..."
          rows="3"
        />
      </div>

      <button type="submit" className="submit-btn">
        {initialData ? 'Обновить' : 'Добавить'}
      </button>
    </form>
  );
};

export default FlowerForm;