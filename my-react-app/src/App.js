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
      comment: "Опрыскивать листья"
    }
  ]);

  const [editingFlower, setEditingFlower] = useState(null);

  const addFlower = (newFlower) => {
    if (editingFlower) {
      setFlowers(flowers.map(f => 
        f.id === editingFlower.id ? { ...newFlower, id: editingFlower.id } : f
      ));
      setEditingFlower(null);
    } else {
      setFlowers([...flowers, { ...newFlower, id: Date.now() }]);
    }
  };

  const deleteFlower = (id) => {
    setFlowers(flowers.filter(flower => flower.id !== id));
  };

  const startEditing = (flower) => {
    setEditingFlower(flower);
  };

  return (
    <div className="app">
      <h1>Мои растения</h1>
      <FlowerForm 
        onSubmit={addFlower} 
        initialData={editingFlower} 
      />
      <div className="flower-list">
        {flowers.map(flower => (
          <FlowerCard 
            key={flower.id} 
            flower={flower} 
            onDelete={deleteFlower}
            onEdit={startEditing}
          />
        ))}
      </div>
    </div>
  );
}

export default App;