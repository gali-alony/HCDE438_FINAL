import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/0_Home';
import AddWord from './pages/1_AddWord';
import WordDetail from './pages/2_WordDetail';


function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/add">Add Word</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddWord />} />
        <Route path="/word/:wordId" element={<WordDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

