import { useState } from "react";
import Form from "../auth/Form";
import InputLabel from "../auth/InputLabel";
import SubmitButton from "../auth/SubmitButton";
import SwitchPages from "../auth/SwitchPages";

export default function RegisterForm() {
    const [password1 , setPassword1] = useState<string>("");
    const [password2 , setPassword2] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    return(
        <main>
            <Form type="register" error={error} onSubmit={(e) => { e.preventDefault();}}>

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
