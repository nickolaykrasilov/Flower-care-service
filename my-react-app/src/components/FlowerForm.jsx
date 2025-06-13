import { useState } from 'react';

const FlowerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    watering: 'Умеренный',
    light: 'Рассеянный',
    temperature: '18-25°C',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    onSubmit(formData);
    setFormData({
      name: '',
      watering: 'Умеренный',
      light: 'Рассеянный',
      temperature: '18-25°C',
      comment: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flower-form">
      <h2>Добавить новое растение</h2>
      
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Название растения"
        required
      />
      
      <label>
        Интенсивность полива:
        <select 
          name="watering" 
          value={formData.watering} 
          onChange={handleChange}
        >
          <option value="Редкий">Редкий</option>
          <option value="Умеренный">Умеренный</option>
          <option value="Обильный">Обильный</option>
        </select>
      </label>
      
      <label>
        Уровень освещения:
        <select 
          name="light" 
          value={formData.light} 
          onChange={handleChange}
        >
          <option value="Тень">Тень</option>
          <option value="Рассеянный">Рассеянный</option>
          <option value="Прямой">Прямой</option>
        </select>
      </label>
      
      <input
        type="text"
        name="temperature"
        value={formData.temperature}
        onChange={handleChange}
        placeholder="Температурный режим (например, 18-25°C)"
      />
      
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Дополнительные заметки по уходу..."
      />
      
      <button type="submit">Добавить растение</button>
    </form>
  );
};

export default FlowerForm;