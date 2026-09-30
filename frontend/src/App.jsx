import { useState } from 'react';
import AlgorithmForm from './components/AlgorithmForm';
import AlgorithmList from './components/AlgorithmList';
import './App.css';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSaved() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-glow" />
        <h1 className="app-title">
          <span className="logo">◈</span> Data Science Models
        </h1>
        <p className="app-subtitle">
          Curate, store and browse algorithms &amp; code snippets for your IITM
          coursework.
        </p>
      </header>

      <main className="app-main">
        <AlgorithmForm onSaved={handleSaved} />
        <AlgorithmList refreshKey={refreshKey} />
      </main>

      <footer className="app-footer">
        <span>IITM Assignment · Data Science Models</span>
      </footer>
    </div>
  );
}
