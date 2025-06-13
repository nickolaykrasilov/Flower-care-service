import { useState } from 'react';

const AuthForm = ({ onLogin }) => {
  const [authData, setAuthData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Временная заглушка для демонстрации
    if (authData.username && authData.password) {
      onLogin();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Вход в систему</h2>
      <input
        type="text"
        name="username"
        value={authData.username}
        onChange={handleChange}
        placeholder="Имя пользователя"
        required
      />
      <input
        type="password"
        name="password"
        value={authData.password}
        onChange={handleChange}
        placeholder="Пароль"
        required
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default AuthForm;