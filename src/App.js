import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/0_Home';
import AddWord from './pages/1_AddWord';
import WordDetail from './pages/2_WordDetail';
import { Home as HomeIcon, PlusCircle } from 'lucide-react';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow p-4 flex items-center gap-6 border-b">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
        >
          <HomeIcon className="w-4 h-4" />
          Home
        </Link>
        <Link
          to="/add"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
        >
          <PlusCircle className="w-4 h-4" />
          Add Word
        </Link>
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


