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
        typeof target["password"]["value"] == "string" &&
        "confirmPassword" in target &&
        target["confirmPassword"] &&
        typeof target["confirmPassword"] == "object" &&
        "value" in target["confirmPassword"] &&
        target["confirmPassword"]["value"] &&
        typeof target["confirmPassword"]["value"] == "string"
    ) {
        return true;
    } else {
        return false;
    }
}

export default function RegisterForm() {
    const [password , setPassword] = useState<string>("");

    const [confirmPassword , setConfirmPassword] = useState<string>("");

    const [error, setErrorRaw] = useState<string | null>(null);
    
    const [sendable, setSendable] = useState<boolean>(false);
    
    function setError(e: string | null) {
        setErrorRaw(e);
        if (e == null) setSendable(true);
        else setSendable(false);
    }


    const { register } = useAuth();

    const navigate = useNavigate();

    function handlePasswordUpdate(t: "password" | "confirmPassword") {
        return function(e: { target: { value: string; }; }) {
            const value = e.target.value;
            if (t == "password") {
                if (confirmPassword == "" || confirmPassword != value) {
                    setError("The passwords do not match.");
                } else {
                    setError(null);
                }
                setPassword(value);
            } else if (t == "confirmPassword") {
                if (password == "" || password != value) {
                    setError("The passwords do not match.");
                } else {
                    setError(null);
                }
                setConfirmPassword(value);
            }
        };
    }

    return(
        <main>
            <Form type="register" error={error}
                onSubmit={(e) => {
                    e.preventDefault();
                    (async(target: any) => {
                        if (validate(target)) {
                            if (target["password"]["value"] != target["confirmPassword"]["value"]) {
                                setError("The passwords do not match.");
                                return;
                            }
                            if (!target["username"]["value"] || target["username"]["value"] == "") {
                                setError("Please enter a username.");
                                return;
                            }
                            const result = await register({
                                username: target["username"]["value"],
                                password: target["password"]["value"],
                                confirmPassword: target["confirmPassword"]["value"]
                            });

                            if (result) {
                                setError(null);
                                navigate("/");
                                return;
                            } else {
                                setError("An error occurred while creating your account.");
                            }
                        }
                    })(e.target);
                }}>

                <InputLabel required identifier="username" type="text"
                    onChange={(e) => {
                        if (!e.target.value || e.target.value == "") {
                            setError("Please enter a username.");
                            return;
                        } else {
                            setError(null);
                        }
                    }}>
                    Username
                </InputLabel>

                <InputLabel required identifier="password" type="password"
                    onChange={handlePasswordUpdate("password")}>
                Password
                </InputLabel>

                <InputLabel required identifier="confirmPassword" type="password"
                    onChange={handlePasswordUpdate("confirmPassword")}>
                    Confirm Password
                </InputLabel>

                <SubmitButton enabled={sendable} >Create Account</SubmitButton>

                <SwitchPages plain="Already have an account?" to="/login">Login</SwitchPages>

            </Form>
        </main>
    );
}
