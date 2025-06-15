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

  // Обработчик ошибок API
  const handleApiError = useCallback((error) => {
    if (error.response?.status === 401) {
      setError('Сессия истекла. Пожалуйста, войдите снова.');
      authService.logout();
      setIsAuthenticated(false);
    } else {
      setError(
        error.response?.data?.detail || 
        error.message || 
        'Произошла ошибка'
      );
    }
  }, []);

  // Мемоизированная функция загрузки цветов
  const loadFlowers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await flowerService.getFlowers();
      setFlowers(data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]); // Добавляем handleApiError в зависимости

  // Обработчик аутентификации
  const handleAuth = useCallback(async (authData, isLogin) => {
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await authService.login(authData.username, authData.password);
      } else {
        await authService.register(authData);
      }
      setIsAuthenticated(true);
      await loadFlowers();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [loadFlowers, handleApiError]); // Зависимости

  // Выход из системы
  const handleLogout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setFlowers([]);
  }, []);

  // Обработчик отправки формы цветка
  const handleSubmit = useCallback(async (flowerData) => {
    setLoading(true);
    setError(null);
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
  }, [editingFlower, loadFlowers, handleApiError]); // Зависимости

  // Обработчик удаления цветка
  const handleDelete = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await flowerService.deleteFlower(id);
      setFlowers(prev => prev.filter(flower => flower.id !== id));
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]); // Зависимости

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const isAuth = !!token;
        setIsAuthenticated(isAuth);
        if (isAuth) await loadFlowers();
      } catch (err) {
        handleApiError(err);
      } finally {
        setAuthChecked(true);
      }
    };
    
    checkAuth();
  }, [loadFlowers, handleApiError]); // Зависимости

  if (!authChecked) {
    return <div className="loading-screen">Проверка авторизации...</div>;
  }

  if (loading) return <div className="loading-screen">Загрузка...</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌿 Мой цветочный дневник</h1>
        {isAuthenticated && (
          <button 
            onClick={handleLogout}
            className="logout-btn"
            disabled={loading}
          >
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

      {!isAuthenticated ? (
        <AuthForm 
          onSubmit={handleAuth} 
          loading={loading} 
        />
      ) : (
        <>
          <FlowerForm 
            onSubmit={handleSubmit} 
            initialData={editingFlower} 
            loading={loading}
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