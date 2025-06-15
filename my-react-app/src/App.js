import { useState, useEffect, useCallback } from 'react';
import { authService, flowerService } from './api';
import FlowerCard from './components/FlowerCard';
import FlowerForm from './components/FlowerForm';
import AuthForm from './components/AuthForm';
import './App.css';

function App() {
  const [flowers, setFlowers] = useState([]);
  const [editingFlower, setEditingFlower] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Проверка валидности токена
  const checkTokenValidity = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return false;
      
      // Простая проверка наличия токена (можно заменить на реальный запрос к /verify)
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  // Обработчик ошибок API
  const handleApiError = useCallback((error) => {
    console.error('API Error:', error);
    const errorMessage = error.response?.data?.detail || error.message || 'Произошла ошибка';
    setError(errorMessage);
    return error;
  }, []);

  // Загрузка списка цветов
  const loadFlowers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await flowerService.getFlowers();
      setFlowers(data);
      setError(null);
    } catch (err) {
      const error = handleApiError(err);
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  // Обработчик входа/регистрации
  const handleAuth = useCallback(async (authData, isLogin) => {
    setLoading(true);
    try {
      if (isLogin) {
        const response = await authService.login(authData.username, authData.password);
        localStorage.setItem('access_token', response.access_token);
      } else {
        await authService.register(authData);
        // Автоматический вход после регистрации
        const response = await authService.login(authData.username, authData.password);
        localStorage.setItem('access_token', response.access_token);
      }
      setIsAuthenticated(true);
      await loadFlowers();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [loadFlowers, handleApiError]);

  // Выход из системы
  const handleLogout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setFlowers([]);
  }, []);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isValid = await checkTokenValidity();
        setIsAuthenticated(isValid);
        if (isValid) {
          await loadFlowers();
        }
      } catch (err) {
        handleApiError(err);
      } finally {
        setAuthChecked(true);
      }
    };

    verifyAuth();
  }, [checkTokenValidity, loadFlowers, handleApiError]);

  // Обработчики для работы с цветами
  const handleSubmit = useCallback(async (flowerData) => {
    setLoading(true);
    try {
      if (editingFlower) {
        await flowerService.updateFlower(editingFlower.id, flowerData);
      } else {
        await flowerService.createFlower(flowerData);
      }
      await loadFlowers();
      setEditingFlower(null);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [editingFlower, loadFlowers, handleApiError]);

  const handleDelete = useCallback(async (id) => {
    setLoading(true);
    try {
      await flowerService.deleteFlower(id);
      setFlowers(prev => prev.filter(flower => flower.id !== id));
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  if (!authChecked) {
    return <div className="loading-screen">Проверка авторизации...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌿 Мой цветочный дневник</h1>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-btn">
            Выйти
          </button>
        )}
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {loading && <div className="loading-overlay">Загрузка...</div>}

      {!isAuthenticated ? (
        <AuthForm onSubmit={handleAuth} loading={loading} />
      ) : (
        <>
          <FlowerForm 
            onSubmit={handleSubmit} 
            initialData={editingFlower} 
          />
          <div className="flower-list">
            {flowers.length > 0 ? (
              flowers.map(flower => (
                <FlowerCard
                  key={flower.id}
                  flower={flower}
                  onDelete={handleDelete}
                  onEdit={() => setEditingFlower(flower)}
                />
              ))
            ) : (
              <div className="empty-list">Нет добавленных растений</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;