import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const [password1 , setPassword1] = useState<string>("");
    const [password2 , setPassword2] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    return(
        <main>
            <form className="register" onSubmit={(e) => { e.preventDefault(); }}>
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
                        <input required onChange={(e) => {
                            if (password2 != "" && password2 != e.target.value) {
                                setError("The passwords do not match.");
                            } else {
                                setError(null);
                            }
                            setPassword1(e.target.value);
                        }} type="password" name="password" id="password" />
                    </div>
                </div>

                <div className="input-label">
                    <label htmlFor="password">Confirm Password</label>

                    <div className="form-input">
                        <input required onChange={(e) => {
                            if (password1 != "" && password1 != e.target.value) {
                                setError("The passwords do not match.");
                            } else {
                                setError(null);
                            }
                            setPassword2(e.target.value);
                        }} type="password" name="confirmPassword" id="confirmPassword" />
                    </div>
                </div>

                <button type="submit">Registrar</button>

                <div className="switch-pages">
                    <p>Already have an account?<> </><Link to="/login">Login</Link></p>
                </div>

                <div className="top-error invisible"><p>-</p></div>
            </form>
        </main>
    );
}
