import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import Form from "../auth/Form";
import InputLabel from "../auth/InputLabel";
import SubmitButton from "../auth/SubmitButton";
import SwitchPages from "../auth/SwitchPages";

export default function RegisterForm() {
    const [password1 , setPassword1] = useState<string>("");

    const [password2 , setPassword2] = useState<string>("");

    const [error, setError] = useState<string | null>(null);

    const { register } = useAuth();

    const navigate = useNavigate();

    return(
        <main>
            <Form type="register" error={error}
                onSubmit={(e) => {
                    e.preventDefault();
                    (async(target: any) => {
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
                            typeof target["password"]["value"] == "string" &&
                            "confirmPassword" in target &&
                            target["confirmPassword"] &&
                            typeof target["confirmPassword"] == "object" &&
                            "value" in target["confirmPassword"] &&
                            target["confirmPassword"]["value"] &&
                            typeof target["confirmPassword"]["value"] == "string"
                        ) {
                            const result = await register({
                                username: target["username"]["value"],
                                password: target["password"]["value"],
                                confirmPassword: target["confirmPassword"]["value"]
                            });

                            if (result) {
                                setError(null);
                                navigate("/");
                                return;
                            }
                        }
                    })(e.target);
                }}>

                <InputLabel required identifier="username" type="text">
                    Username
                </InputLabel>

                <InputLabel required identifier="password" type="password"
                    onChange={(e) => {
                        if (password2 != "" && password2 != e.target.value) {
                            setError("The passwords do not match.");
                        } else {
                            setError(null);
                        }
                        setPassword1(e.target.value);
                    }}>
                Password
                </InputLabel>

                <InputLabel required identifier="confirmPassword" type="password"
                    onChange={(e) => {
                        if (password1 != "" && password1 != e.target.value) {
                            setError("The passwords do not match.");
                        } else {
                            setError(null);
                        }
                        setPassword2(e.target.value);
                    }}>
                    Confirm Password
                </InputLabel>

                <SubmitButton>Create Account</SubmitButton>

                <SwitchPages plain="Already have an account?" to="/login">Login</SwitchPages>

            </Form>
        </main>
    );
}
