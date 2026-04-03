import { createContext, useContext, useState, useEffect } from "react";

import { signIn } from "../services/authservice";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // état local pour stocker l'utilisateur (null = non connecté)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); // Ajout de l'état token initialisé à null
    const [loading, setLoading] = useState(true);
    

    const loginUser = async (login, password) => {
        const data = await signIn(login, password);
        setUser(data.visiteur); // Met à jour l'état user avec les données de l'utilisateur connecté
        setToken(data.token); // Stocke le token si nécessaire
        return data;
    }

    const logoutUser = () => {
    logout();
    setUser(null);
    setToken(null);
    };
    
    useEffect(() => {
        const user = getCurrentUser();
        const token = getAuthToken();
        if (user && token) {
            setUser(user);
            setToken(token);
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );

}


export function useAuth() {
    return useContext(AuthContext);
}

export function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function getAuthToken() {
    return localStorage.getItem('token');
}
export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}
