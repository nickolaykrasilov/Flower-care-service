import { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import '../styles/FlowerForm.css';

const FlowerForm = ({ onSubmit, initialData, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    watering_intensity: null,
    light_level: null,
    temperature_range: { min: null, max: null },
    comment: null
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        watering_intensity: initialData.watering_intensity || null,
        light_level: initialData.light_level || null,
        temperature_range: initialData.temperature_range || { min: null, max: null },
        comment: initialData.comment || null
      });
    } else {
      setFormData({
        name: '',
        watering_intensity: null,
        light_level: null,
        temperature_range: { min: null, max: null },
        comment: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || null // Сохраняем null для пустых значений
    }));
  };

  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      temperature_range: {
        ...prev.temperature_range,
        [name]: value ? Number(value) : null
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Подготовка данных в формате API
    const apiData = {
      name: formData.name,
      watering_intensity: formData.watering_intensity,
      light_level: formData.light_level,
      temperature_range: formData.temperature_range,
      comment: formData.comment
    };
    
    onSubmit(apiData);
    
    // Сброс формы только при создании нового цветка
    if (!initialData && !loading) {
      setFormData({
        name: '',
        watering_intensity: null,
        light_level: null,
        temperature_range: { min: null, max: null },
        comment: null
      });
    }
  };

  // Варианты для селектов
  const wateringOptions = [
    { value: null, label: 'Not specified' },
    { value: 'Light', label: 'Light' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Deep', label: 'Deep' }
  ];

  const lightOptions = [
    { value: null, label: 'Not specified' },
    { value: 'Shadow', label: 'Shadow' },
    { value: 'Penumbra', label: 'Penumbra' },
    { value: 'Diffused light', label: 'Diffused light' },
    { value: 'Direct light', label: 'Direct light' }
  ];

  return (
    <form onSubmit={handleSubmit} className="flower-form">
      <h2 className="form-title">
        {initialData ? (
          <>
            <FaEdit /> Edit
          </>
        ) : (
          <>
            <FaPlus /> Add
          </>
        )}
      </h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="For example: Ficus Benjamin"
          required
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Watering</label>
          <select 
            name="watering_intensity" 
            value={formData.watering_intensity || ''}
            onChange={handleChange}
            disabled={loading}
          >
            {wateringOptions.map(option => (
              <option key={option.value || 'empty'} value={option.value || ''}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ligth level</label>
          <select 
            name="light_level" 
            value={formData.light_level || ''}
            onChange={handleChange}
            disabled={loading}
          >
            {lightOptions.map(option => (
              <option key={option.value || 'empty'} value={option.value || ''}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Temp</label>
          <div className="temp-inputs">
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={formData.temperature_range.min || ''}
              onChange={handleTempChange}
              disabled={loading}
            />
            <span>-</span>
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={formData.temperature_range.max || ''}
              onChange={handleTempChange}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Note</label>
        <textarea
          name="comment"
          value={formData.comment || ''}
          onChange={handleChange}
          placeholder="Features of care, preferences..."
          rows="3"
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? (
          <span>Conservation...</span>
        ) : (
          initialData ? 'Update' : 'Add'
        )}
      </button>
    </form>
  );
};

export default FlowerForm;