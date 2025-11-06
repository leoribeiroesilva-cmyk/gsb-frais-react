import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // état local pour stocker l'utilisateur (null = non connecté)
    // todo : valeur nulle
    const [user, setUser] = useState(null);

    const loginUser = (login, password) => {
        // todo : appel API pour vérifier les identifiants
        // si login/mot de passe valide correspondent à des valeurs attendues,
        // si le login est "admin" et le mot de passe "password", par exemple,
        // alors renvoyer true et mettre à jour l'état avec le login de l'utilisateur connecté
        // Si la connexion échoue, renvoyer false
        if (login === "admin" && password === "password") {
            setUser({ login : login });
            return true;
        } else {
            return false;
        }
    }

    const logoutUser = () => {
        // todo : réinitialiser la valeur de l'etat à nulle
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}