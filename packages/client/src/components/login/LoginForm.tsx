import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import Form from "../auth/Form";
import InputLabel from "../auth/InputLabel";
import SubmitButton from "../auth/SubmitButton";
import SwitchPages from "../auth/SwitchPages";

function validate(target: unknown) {
    if (target &&
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
        typeof target["password"]["value"] == "string") {
        return true;
    }
    return false;
}

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const { login } = useAuth();

    return (
        <main>
            <Form type="login" error={error} onSubmit={(e) => {
                e.preventDefault();
                (async(target: any) => {
                    if (validate(target)) {
                        const loginResult = await login({ username: target.username.value, password: target.password.value });
                        if (loginResult) {
                            setError(null);
                            navigate("/");
                            return;
                        }
                        setError("The username or password is invalid.");
                    } else {
                        setError("The username or password is invalid.");
                    }
                })(e.target);
            }}>
                <InputLabel required identifier="username" type="text">
                    Username
                </InputLabel>

                <InputLabel required identifier="password" type="password">
                    Password
                </InputLabel>

                <SubmitButton>Log In</SubmitButton>
                <SwitchPages plain="New here?" to="/register">Create an account</SwitchPages>
            </Form>
        </main>
    );
}
