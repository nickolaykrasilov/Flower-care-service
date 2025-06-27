import { useState, useEffect } from 'react';
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
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value || null }));
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
    onSubmit({
      name: formData.name,
      watering_intensity: formData.watering_intensity,
      light_level: formData.light_level,
      temperature_range: formData.temperature_range,
      comment: formData.comment
    });
  };

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
      <div className="form-rows">
        {/* Name Row */}
        <div className="form-row">
          <div className="form-prefix name-prefix">
            <span>🌿 Name:</span>
          </div>
          <div className="form-content">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ficus Benjamin"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Watering Row */}
        <div className="form-row">
          <div className="form-prefix watering-prefix">
            <span>💦 Watering:</span>
          </div>
          <div className="form-content">
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
        </div>

        {/* Light Level Row */}
        <div className="form-row">
          <div className="form-prefix light-level-prefix">
            <span>☀️ Light level:</span>
          </div>
          <div className="form-content">
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
        </div>

        {/* Temperature Row */}
        <div className="form-row">
          <div className="form-prefix temperature-prefix">
            <span>🌡 Temp:</span>
          </div>
          <div className="form-content temp-inputs">
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

        {/* Note Row */}
        <div className="form-row">
          <div className="form-prefix note-prefix">
            <span>✏️ Note:</span>
          </div>
          <div className="form-content">
            <textarea
              name="comment"
              value={formData.comment || ''}
              onChange={handleChange}
              placeholder="Care features..."
              rows="3"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : (initialData ? 'Update' : 'Add')}
        </button>
      </div>
    </form>
  );
};

export default FlowerForm;