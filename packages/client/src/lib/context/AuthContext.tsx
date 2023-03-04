import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ClientConfig } from "../../ClientConfig";

export interface AuthContext {
    token: string | null;
    login: (props: LoginProps) => Promise<boolean>;
    logout: () => Promise<void>;
    register: (props: RegisterProps) => Promise<boolean>;
}

export interface LoginProps {
    username: string;
    password: string;
}

export interface RegisterProps {
    username: string;
    password: string;
    confirmPassword: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const Context = createContext<AuthContext>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    async function register({ username, password, confirmPassword }: RegisterProps) {
        return fetch(ClientConfig.ApiUri + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, confirmPassword })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return false;
        }).then((data: unknown) => {
            if (data && typeof data == "object" && "access_token" in data && typeof data.access_token === "string") {
                localStorage.setItem("token", data.access_token);
                return true;
            }
            return false;
        }).catch((err) => {
            console.error(err);
            return false;
        });
    }

    async function login({ username, password }: LoginProps): Promise<boolean> {
        return fetch(ClientConfig.ApiUri + "/auth/login", {
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
            if (data && typeof data == "object" && "access_token" in data && typeof data.access_token === "string") {
                localStorage.setItem("token", data.access_token);
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
        logout,
        register
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
