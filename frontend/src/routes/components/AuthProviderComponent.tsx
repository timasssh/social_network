import { createContext, useContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    username: string | null;
    name: string | null;
    login: (token: string) => void;
    logout: () => void;
    saveDataAtStorage: (name: string, username: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("token")
    );
    const [username, setUsername] = useState<string | null>(
        sessionStorage.getItem("username")
    );
    const [name, setName] = useState<string | null>(
        sessionStorage.getItem("name")
    );

    function login(newToken: string) {
        sessionStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function saveDataAtStorage(name: string, username: string) {
        sessionStorage.setItem("name", name);
        setName(name);
        sessionStorage.setItem("username", username);
        setUsername(username);
    }

    function logout() {
        sessionStorage.removeItem("token");
        setToken(null);
        sessionStorage.removeItem("name");
        setName(null);
        sessionStorage.removeItem("username");
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={{ token, username, name, login, logout, saveDataAtStorage }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
    }

    return context;
}