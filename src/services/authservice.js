import axios from "axios";

// export const API_URL = "http://gsb.julliand.etu.lmdsio.com/api/";
export const API_URL = "http://gsb.ribeiroesilva.etu.lmdsio.com/api/";

export const signIn = async (login, password) => {
    const response = await axios.post(`${API_URL}visiteur/auth`, { login: login, pwd: password });
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.visiteur));
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const getAuthToken = () => {
    return localStorage.getItem("token");
};
