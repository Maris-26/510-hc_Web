import React from 'react';
import './App.css';
import CocktailSearch from './components/CocktailSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cocktail Curator</h1>
      </header>
      <main>
        <CocktailSearch />
      </main>
    </div>
  );
}

export default App; 