import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";

export interface LoginFormProps {
    setType: (type: "login" | "register") => void;
}

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    return (
        <main>
            <form className="login"
                onSubmit={(e) => {
                    e.preventDefault();
                    (async(target: unknown) => {
                        if (
                            target &&
                        typeof target == "object" &&
                        "username" in target &&
                        target["username"] &&
                        typeof target["username"] == "object" &&
                        "value" in target["username"] &&
                        target["username"]["value"] &&
                        typeof target["username"]["value"] == "string" &&
                        "password" in target &&
                        target["password"] &&
                        typeof target["password"] == "object" &&
                        "value" in target["password"] &&
                        target["password"]["value"] &&
                        typeof target["password"]["value"] == "string"
                        ) {
                            const loginResult = await login({ username: target.username.value, password: target.password.value });
                            if (loginResult) {
                                setError(null);
                                <Navigate to="/"/>;
                                return;
                            }
                            setError("The username or password is invalid.");
                        } else {
                            setError("The username or password is invalid.");
                        }
                    })(e.target);
                }}>
                <div className={`top-error${error ? "" : " invisible"}`}>
                    <p>{error ?? "-"}</p>
                </div>

                <div className="input-label">
                    <label htmlFor="username">Username</label>
                    <div className="form-input">
                        <input required type="text" name="username" id="username" />
                    </div>
                </div>
                
                <div className="input-label">
                    <label htmlFor="password">Password</label>
                    <div className="form-input">
                        <input required type="password" name="password" id="password" />
                    </div>
                </div>

                <button type="submit">Log In</button>

                <div className="switch-pages">
                    <p>New here?<> </><Link to="/register">Create an account</Link></p>
                </div>

                <div className="top-error invisible"><p>-</p></div>
            </form>
        </main>
    );
}
