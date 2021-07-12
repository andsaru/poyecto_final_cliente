import { useEffect, useState } from "react"
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { PRIVATE_URL } from "../config/config";
import { useAuthContext } from "../context/AuthContext";
import './styles/dashboard.css';

export default function Dashboard() {
    const { signOut, getAuthHeaders, loginUser, isAdmin } = useAuthContext();
    const [privateMessage, setPrivateMessage] = useState("");



    return (

            <main>
                <div className="glass">
                    <div className="dashboardy">
                        <div className="container text-center pt-5">
                            <h1>This is a private Dashboard. Welcome {loginUser?.email}</h1>
                            <p>Message from a protected API: {privateMessage}</p>
                            {isAdmin() && <NavLink to="/admin">Go to Admin Page (This is only visible if you are admin)</NavLink>}
                        </div>
                    </div>
                </div>
                <div class="circle1"></div>
                <div class="circle2"></div>
            </main>

    )
}
