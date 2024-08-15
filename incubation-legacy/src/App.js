import './App.css';
import './CSS/ItemsPage.css';
import './CSS/Navbar.css';
import ItemsPage from './pages/ItemsPage';
import AdminPage from './pages/AdminPage';
import Navbar from './GeneralComponents/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path='/' element={<ItemsPage />} />
          <Route path='/page_b' element={<page_b />} />
          <Route path='/admin' element={<AdminPage />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
