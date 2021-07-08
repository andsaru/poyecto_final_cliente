import { Redirect, useHistory } from "react-router";
import { LOGIN_URL } from "../config/config";
import { useForm } from "../hooks/useForm";
import { useAuthContext } from "../context/AuthContext";

import './styles/index.css';

export default function Login() {
    const [form, handleChange] = useForm({username: "user@email.com", password: "root"})
    const {signIn, isAuthenticated} = useAuthContext();
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        
        const options = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(form)
        }

        const response = await fetch(LOGIN_URL, options);
        const data = await response.json();
        
        if(response.status >= 200 && response.status < 300) {
            signIn(data.token, data.user);
            history.push("/dashboard")
        } else {
            alert("Login incorrecto");
        }
    };
    
    // Antes de procesar el JSX comprueba si está autenticado, si lo está, lo redirige al dashboard
    return isAuthenticated ? <Redirect to="/dashboard" /> : (
        <div className="Appy">
        <form className="formy" onSubmit={handleSubmit}>
            <div className="form-inner">
                <h2 className="h2y">Login</h2>
                
                <div className="form-group">
                    <label className="labely" htmlFor="username">Email: </label>
                    <input className="inputy" type="email" name="username" id="email" onChange={handleChange} value={form.email}/>
                </div>
                <div className="form-group">
                    <label className="labely" htmlFor="password">Password: </label>
                    <input className="inputy" type="password" name="password" id="password" onChange={handleChange} value={form.password}/>
                </div>
                <input className="inputy" type="submit" value="LOGIN" />
            </div>
        </form>
        </div>
    )
}

