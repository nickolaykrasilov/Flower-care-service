import { useState } from 'react';
import FlowerCard from './components/FlowerCard';
import FlowerForm from './components/FlowerForm';
import './App.css';

function App() {
  const [flowers, setFlowers] = useState([
    {
      id: 1,
      name: "Монстера",
      watering: "Умеренный",
      light: "Рассеянный",
      temperature: "18-25°C",
      comment: "Опрыскивать листья 2 раза в неделю"
    },
    {
      id: 2,
      name: "Кактус",
      watering: "Редкий",
      light: "Прямой",
      temperature: "20-30°C",
      comment: "Поливать раз в 3 недели"
    }
  ]);

  const addFlower = (newFlower) => {
    setFlowers([...flowers, { ...newFlower, id: Date.now() }]);
  };

  const deleteFlower = (id) => {
    setFlowers(flowers.filter(flower => flower.id !== id));
  };

  return (
    <div className="app">
      <h1>Мой садовый дневник</h1>
      <FlowerForm onSubmit={addFlower} />
      <div className="flower-list">
        {flowers.map(flower => (
          <FlowerCard 
            key={flower.id} 
            flower={flower} 
            onDelete={deleteFlower}
          />
        ))}
      </div>
    </div>
  );
}

export default App;