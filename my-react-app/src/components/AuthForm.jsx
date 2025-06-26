import { useState } from 'react';
import '../styles/AuthForm.css';

function AuthForm({ onSubmit, loading }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.password2) {
      alert('Passwords don`t match!');
      return;
    }
    
    onSubmit(formData, isLogin);
  };

  return (
    <div className="auth-container" style={{ backgroundColor: '#f0e2a0' }}>
      <div className="auth-header">
        <h2 className="auth-title" style={{ color: '#4e3d2c' }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
          <span className="auth-icon">{isLogin ? '🪴' : '🌱'}</span>
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            disabled={loading}
            className="auth-input"
            style={{
              backgroundColor: '#a3c57d',
              borderColor: '#6e944a',
              color: '#6e944a'
            }}
          />
        </div>
        
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            disabled={loading}
            className="auth-input"
            style={{
              backgroundColor: '#a3c57d',
              borderColor: '#6e944a',
              color: '#6e944a'
            }}
          />
          <span 
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </span>
        </div>
        
        {!isLogin && (
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              disabled={loading}
              className="auth-input"
              style={{
                backgroundColor: '#a3c57d',
                borderColor: '#6e944a',
                color: '#6e944a'
              }}
            />
            <span 
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          className="auth-submit-btn"
          style={{
            backgroundColor: '#9e7c5a',
            color: '#4e3d2c'
          }}
        >
          {loading ? (
            <>
              <span className="spinner">🌀</span> Processing...
            </>
          ) : isLogin ? (
            'Sign In'
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      
      <button 
        onClick={() => setIsLogin(!isLogin)} 
        disabled={loading}
        className="auth-toggle-btn"
        style={{ color: '#4e3d2c' }}
      >
        {isLogin ? 'To Sign Up?' : 'To Sign In?'}
      </button>
    </div>
  );
}

export default AuthForm;