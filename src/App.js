import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import FraisAdd from './pages/FraisAdd';

function App() {
  return (
    // le fonctionnement
    // Authprovider dans app.js
    // mettre à disposition le (user, loginUser, logoutUser)
    // composants a (ex: navbar,)
      // utilise useAuth pour afficher/masquer les liens
    
      // composants b (ex: login)
      // utilise useAuth pour appeler 'login(email, password)'
    
      // composants c (ex: dashboard)
      // utilise useAuth pour vérifier si 'user' est connecté
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/frais/ajout' element={<FraisAdd />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

}

export default App;
