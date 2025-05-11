import { createContext, useState, useContext, useEffect } from 'react';
import * as authServices from '../services/AuthServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setToken] = useState(() => localStorage.getItem('jwtToken') || null);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('jwtToken', accessToken);
        } else {
            localStorage.removeItem('jwtToken');
        }
    }, [accessToken]);

    const getResponse = async (response) => {
        const data = await response;
        if (data?.accessToken) {
            setToken(data.accessToken);
        }
        return data;
    };

    // Prisijungimas
    const login = async (email, password) => {
        return getResponse(authServices.login(email, password));
    };

    // Atsijungimas
    const logout = () => {
        setToken(null);
    };


    // Naujo vartotojo kūrimas
    const createUser = async (userData) => {
        return getResponse(authServices.createUser(userData, accessToken));
    };


    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setToken,
                login,
                logout,
                createUser,
                getResponse,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth turi būti naudojamas su AuthProvider');
    }
    return context;
};