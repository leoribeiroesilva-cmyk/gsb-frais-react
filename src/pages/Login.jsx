import {  useState } from 'react';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    // 1. états locaux pour les champs de formulaire
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    // 2. récupérer la fonction loginUser depuis le contexte d'authentification
    const { loginUser } = useAuth();

    // 3. hook pour la redirection après connexion
    const navigate = useNavigate();

    // 4. declaration de la fonction handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        // Appel de la fonction login avec email et password
        if (loginUser(login, password)) {
            // redirection vers le tableau de bord en cas de succès
            navigate('/');
        } else {
            // afficher un message d'erreur en cas d'échec
            alert('Login ou mot de passe incorrect');
        }
    }

    // 5. Rend le formulaire 
    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>Connexion</h1>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div>
                        <label>Login :</label>
                        <input 
                            type="text" 
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Mot de passe :</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}
