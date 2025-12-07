import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Load user from session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Sync current user data with "database" (users object) whenever it changes
    const saveUserToDB = (user) => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        users[user.email] = user;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
    };

    const signup = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');

        if (users[email]) {
            throw new Error('Účet s tímto emailem již existuje.');
        }

        const newUser = {
            name,
            email,
            password, // In a real app, never store plain text passwords!
            points: 0,
            completedRoutes: {} // Map of routeId -> completion data
        };

        saveUserToDB(newUser);
        return newUser;
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[email];

        if (!user || user.password !== password) {
            throw new Error('Nesprávný email nebo heslo.');
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        return user;
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        router.push('/login');
    };

    const updateUserProgress = (routeId, pointsEarned, stats) => {
        if (!currentUser) return; // Or handle guest mode if desired

        const updatedUser = { ...currentUser };

        // Check if submitting for the first time or improving score? 
        // For simplicity, we just overwrite or add.
        // Logic: If already completed, maybe don't add points again? 
        // Usually points are for *first* completion.

        const previouslyCompleted = updatedUser.completedRoutes[routeId]?.completed;

        if (!previouslyCompleted) {
            updatedUser.points = (updatedUser.points || 0) + pointsEarned;
        }

        updatedUser.completedRoutes[routeId] = {
            completed: true,
            ...stats,
            completedAt: new Date().toISOString()
        };

        saveUserToDB(updatedUser);
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
        updateUserProgress,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
