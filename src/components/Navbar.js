import { NavLink, useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
    
    const { isAuthenticated, signOut } = useAuthContext();
    const history = useHistory();

    const handleSignOut = () => {
        /**
         * Cierra la sesión utilizando la función disponible en el contexto Auth
         * y redirige a la página de login o a la principal.
        */

        signOut();
        history.push("/");
    };

    // Podríamos hacerlo directamente en el JSX con el operador tenario en lugar de crear dos constantes
    const loginButton = <li><NavLink exact to="/" className="btn btn-success">Login</NavLink></li>;
    const logoutButton = <button exact to="/" onClick={handleSignOut} className="btn btn-warning">Log out</button>;

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <ul className="navbar-nav ps-3">
                <li className="nav-item"><NavLink exact to="/public" className="nav-link">Public Page</NavLink></li>
                <li className="nav-item"><NavLink to="/dashboard" className="nav-link">Panel de control</NavLink></li>
                {isAuthenticated ? logoutButton : loginButton}
            </ul>
        </nav>
    )
}
