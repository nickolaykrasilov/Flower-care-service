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
      alert('Пароли не совпадают!');
      return;
    }
    
    onSubmit(formData, isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2 className="auth-title">
          {isLogin ? 'Вход' : 'Регистрация'}
          <i className={`fas fa-${isLogin ? 'sign-in-alt' : 'user-plus'} auth-icon`}></i>
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <i className="fas fa-user input-icon"></i>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Имя пользователя"
            required
            disabled={loading}
            className="auth-input"
          />
        </div>
        
        <div className="input-group">
          <i className="fas fa-lock input-icon"></i>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            disabled={loading}
            className="auth-input"
          />
          <i 
            className={`fas fa-eye${showPassword ? '-slash' : ''} toggle-password`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        
        {!isLogin && (
          <div className="input-group">
            <i className="fas fa-lock input-icon"></i>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Подтвердите пароль"
              required
              disabled={loading}
              className="auth-input"
            />
            <i 
              className={`fas fa-eye${showConfirmPassword ? '-slash' : ''} toggle-password`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          className="auth-submit-btn"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Обработка...
            </>
          ) : isLogin ? (
            'Войти'
          ) : (
            'Зарегистрироваться'
          )}
        </button>
      </form>
      
      <button 
        onClick={() => setIsLogin(!isLogin)} 
        disabled={loading}
        className="auth-toggle-btn"
      >
        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </div>
  );
}

export default AuthForm;