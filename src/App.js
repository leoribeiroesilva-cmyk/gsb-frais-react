import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
        <Navbar/> 
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<DashBoard />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
