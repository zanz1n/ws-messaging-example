import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const [password1 , setPassword1] = useState<string>("");
    const [password2 , setPassword2] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    return(
        <div className="login-container">
            <form onSubmit={(e) => {
                console.log(e);
            }}>
                {(() => {
                    if (error) {
                        return (
                            <div className="form-top-error">
                                <p>{error}</p>
                            </div>
                        );
                    }
                })()}
                <label htmlFor="username">Username</label>
                <div className="form-input">
                    <input type="text" name="username" id="username" />
                </div>

                <label htmlFor="password">Password</label>
                <div className="form-input">
                    <input onChange={(e) => {
                        if (password2 != "" && password2 != e.target.value) {
                            setError("The passwords do not match.");
                        } else {
                            setError(null);
                        }
                        setPassword1(e.target.value);
                    }} type="password" name="password" id="password" />
                </div>

                <label htmlFor="password">Confirm Password</label>

                <div className="form-input">
                    <input onChange={(e) => {
                        if (password1 != "" && password1 != e.target.value) {
                            setError("The passwords do not match.");
                        } else {
                            setError(null);
                        }
                        setPassword2(e.target.value);
                    }} type="password" name="confirmPassword" id="confirmPassword" />
                </div>

                <button type="submit">Registrar</button>
                <p>Already have an account?
                    <Link to="/login"><a> Login</a></Link>
                </p>
            </form>
        </div>
    );
}
