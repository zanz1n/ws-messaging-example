import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./lib/context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <div className="App">
                <div className="App-gb-img"></div>
                <Outlet/>
            </div>
        </AuthProvider>
    );
}
