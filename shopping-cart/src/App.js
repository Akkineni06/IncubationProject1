import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Items from './pages/Items';
import Cart from './pages/Cart';
import AddItem from './pages/AddItem';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Items />} />
          <Route path='/items' element={<Items />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/additem' element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
