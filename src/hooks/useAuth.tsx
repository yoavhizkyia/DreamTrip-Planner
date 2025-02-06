import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router';

import { userAtom } from '../atoms/user';

export const useAuth = () => {
    const setUser = useSetAtom(userAtom);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/v1/users/auth`, { withCredentials: true });
            await setUser(data);
        } catch {
            try {
                await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/users/refresh`, {}, { withCredentials: true });
                const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/v1/users/auth`, { withCredentials: true });
                await setUser(data);
            }
            catch(error) {
                await setUser(null);
                console.error(error);
            }
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/users/login`, { email, password }, { withCredentials: true });
            await checkAuth();
            navigate('/home')
        }
        catch(error) {
            console.error(error);
        }
    };

    const logout = async () => {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/users/logout`, {}, { withCredentials: true });
        setUser(null);
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/users/signup`, { email, password, username }, { withCredentials: true });
            navigate('/login')
        }
        catch(err) {
            console.error(err)
        }
    }

    return { login, logout, checkAuth, register };
};