import { useState, useEffect } from 'react';

const FlowerForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    watering: 'Умеренный',
    light: 'Рассеянный',
    temperature: '18-25°C',
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
        watering: 'Умеренный',
        light: 'Рассеянный',
        temperature: '18-25°C',
        comment: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flower-form">
      <h2>{initialData ? 'Редактировать растение' : 'Добавить новое растение'}</h2>
      
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Название растения"
        required
      />
      
      <select name="watering" value={formData.watering} onChange={handleChange}>
        <option value="Редкий">Редкий</option>
        <option value="Умеренный">Умеренный</option>
        <option value="Обильный">Обильный</option>
      </select>
      
      <select name="light" value={formData.light} onChange={handleChange}>
        <option value="Тень">Тень</option>
        <option value="Рассеянный">Рассеянный</option>
        <option value="Прямой">Прямой</option>
      </select>
      
      <input
        type="text"
        name="temperature"
        value={formData.temperature}
        onChange={handleChange}
        placeholder="Температурный режим"
      />
      
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Дополнительные заметки"
      />
      
      <button type="submit">
        {initialData ? 'Обновить' : 'Добавить'}
      </button>
      
      {initialData && (
        <button 
          type="button"
          className="cancel-btn"
          onClick={() => {
            setFormData({
              name: '',
              watering: 'Умеренный',
              light: 'Рассеянный',
              temperature: '18-25°C',
              comment: ''
            });
            onSubmit(null);
          }}
        >
          Отмена
        </button>
      )}
    </form>
  );
};

export default FlowerForm;