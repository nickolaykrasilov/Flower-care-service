import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header" style={{ backgroundColor: 'var(--chamoisee)' }}>
        <h1>Мое приложение</h1>
      </header>
      <main className="main-content">
        <section className="card" style={{ backgroundColor: 'var(--tea-green)' }}>
          <h2>Карточка 1</h2>
          <p>Контент карточки</p>
        </section>
        <section className="card" style={{ backgroundColor: 'var(--olivine)' }}>
          <h2>Карточка 2</h2>
          <p>Контент карточки</p>
        </section>
      </main>
      <footer className="footer" style={{ backgroundColor: 'var(--umber)', color: 'var(--parchment)' }}>
        <p>© 2025 Мое приложение</p>
      </footer>
    </div>
  );
}

export default App;