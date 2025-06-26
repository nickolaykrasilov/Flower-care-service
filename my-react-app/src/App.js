import { useState, useEffect, useCallback } from 'react';
import { authService, flowerService } from './api';
import FlowerCard from './components/FlowerCard';
import FlowerForm from './components/FlowerForm';
import AuthForm from './components/AuthForm';
import Notification from './components/Notification';
import './App.css';

function App() {
  const [flowers, setFlowers] = useState([]);
  const [editingFlower, setEditingFlower] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 2000);
  };

  const handleApiError = useCallback((error) => {
    console.error('API Error:', error);
    setError(error.response?.data?.detail || error.message || 'Ошибка сервера');
    return error;
  }, []);

  const loadFlowers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await flowerService.getFlowers();
      setFlowers(data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
      }
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        const isAuth = await checkAuth();
        setIsAuthenticated(isAuth);
        if (isAuth) await loadFlowers();
      } catch (err) {
        handleApiError(err);
      } finally {
        setAuthChecked(true);
      }
    };
    initApp();
  }, [checkAuth, loadFlowers, handleApiError]);

  const handleAuth = useCallback(async (authData, isLogin) => {
    setLoading(true);
    try {
      if (isLogin) {
        const { access_token } = await authService.login(authData.username, authData.password);
        localStorage.setItem('access_token', access_token);
      } else {
        await authService.register(authData);
        const { access_token } = await authService.login(authData.username, authData.password);
        localStorage.setItem('access_token', access_token);
      }
      setIsAuthenticated(true);
      await loadFlowers();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [loadFlowers, handleApiError]);

  const handleLogout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setFlowers([]);
  }, []);

  const handleSubmit = useCallback(async (flowerData) => {
    setLoading(true);
    try {
      if (editingFlower) {
        await flowerService.updateFlower(editingFlower.id, flowerData);
        showNotification(`Растение "${flowerData.name}" успешно обновлено`);
      } else {
        await flowerService.createFlower(flowerData);
        showNotification(`Растение "${flowerData.name}" успешно добавлено`);
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
      setFlowers(prev => prev.filter(f => f.id !== id));
      showNotification('Растение успешно удалено');
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  const handleEdit = (flower) => {
    setEditingFlower(flower);
    showNotification(`Редактируем: ${flower.name}`);
  };

  if (!authChecked) return <div className="loading-screen">Проверка авторизации...</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">ZenGarden</h1>
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout} disabled={loading}>
            Выйти
          </button>
        )}
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button className="btn btn--text" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {loading && <div className="loading">Загрузка...</div>}

      <Notification 
        show={notification.show} 
        message={notification.message}
      />

      {!isAuthenticated ? (
        <AuthForm onSubmit={handleAuth} loading={loading} />
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
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="empty">Нет добавленных растений</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;