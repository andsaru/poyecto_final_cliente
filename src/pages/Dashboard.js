import { useEffect, useState } from "react"
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { PRIVATE_URL } from "../config/config";
import { useAuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const {signOut, getAuthHeaders, loginUser, isAdmin} = useAuthContext();
    const [privateMessage, setPrivateMessage] = useState("");

   
    
    return (
        <div className="container text-center pt-5">
            <h1>This is a private Dashboard. Welcome {loginUser?.email}</h1>
            <p>Message from a protected API: {privateMessage}</p>
            {isAdmin() && <NavLink to="/admin">Go to Admin Page (This is only visible if you are admin)</NavLink>}
        </div>
    )
}
