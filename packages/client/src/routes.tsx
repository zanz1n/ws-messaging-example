import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { useAuth } from "./lib/context/AuthContext";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function ProtectedRoute({ children }): JSX.Element {
    const { token } = useAuth();
    if (!token) return <Navigate to="/login" />;
    return children;
}

export const router = createBrowserRouter([
    { path: "/login", element: <App/>, children: [{ path: "/login", element: <LoginPage/> }] },
    { path: "/register", element: <App/>, children: [{ path: "/register", element: <RegisterPage/> }] },
    { path: "/", element: <App/>, children: [{ path: "/", element: <ProtectedRoute><ChatPage/></ProtectedRoute> }] }
]);
