import LoginForm from "../components/login/LoginForm";
import "../css/Login.css";

export type LoginPageType = "login" | "register"

export default function LoginPage() {
    return (<LoginForm />);
}
