import { useState } from 'react';

function AuthForm({ onSubmit }) {
  const [isLogin, setIsLogin] = useState(true);
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
    onSubmit(formData, isLogin);
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Подтвердите пароль:</label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </div>
  );
}

export default AuthForm;