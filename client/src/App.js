import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import CocktailFrame from './components/CocktailFrame';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<CocktailFrame />} />
            <Route path="/cocktails/:id" element={<CocktailFrame />} />
            <Route path="/search" element={<CocktailFrame />} />
            <Route path="/favorites" element={<CocktailFrame />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 