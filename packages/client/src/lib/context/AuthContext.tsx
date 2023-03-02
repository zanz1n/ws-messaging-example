import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContext {
    token: string | null;
    login: (props: LoginProps) => Promise<boolean>;
    logout: () => Promise<void>;
}

export interface LoginProps {
    username: string;
    password: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const Context = createContext<AuthContext>({});

function AuthProvider({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    async function login({ username, password }: LoginProps): Promise<boolean> {
        return fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return false;
        }).then((data: unknown) => {
            if (data && typeof data == "object" && "token" in data && typeof data.token === "string") {
                localStorage.setItem("token", data.token);
                return true;
            }
            return false;
        }).catch((err) => {
            console.error(err);
            return false;
        });
    }

    async function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const value = useMemo(() => ({
        token,
        login,
        logout
    }), [token]);    

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export function useAuth() {
    return useContext(Context);
}
