import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Si estás usando JWT
import { fetchUserProfile } from '../api'; // Asegúrate de que esta función esté disponible

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Sincroniza la autenticación cada vez que cambia el token
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const userProfile = await fetchUserProfile(token); // Llama a la API para obtener el perfil
                setUser(userProfile);
            };
            getUser();
        } else {
            setUser(null);
        }
    }, [token]); // Dependencia en el token

    const login = async (username, password) => {
        // Lógica para el login
        const response = await loginUser({ username, password }); // Asegúrate de tener esta función definida
        if (response?.access_token) {
            setToken(response.access_token);
            localStorage.setItem('token', response.access_token);
            const userProfile = await fetchUserProfile(response.access_token);
            setUser(userProfile);
            navigate('/profile'); // Redirige a la página de perfil
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login'); // Redirige al login
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
