import { useEffect, useState } from "react"
import { Redirect } from "react-router";
import { ADMIN_URL } from "../config/config";
import { useAuthContext } from "../context/AuthContext";

import './styles/dashboard.css';

export default function Admin() {

    const { getAuthHeaders, loginUser } = useAuthContext();
    const [adminMessage, setAdminMessage] = useState("");

    useEffect(() => {
        const options = { headers: getAuthHeaders() };

        fetch(ADMIN_URL, options)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(data => setAdminMessage(data.message))
            .catch(err => {
                console.log(err, "You are not authorized to see this.");
                return <Redirect to="/" />;
            });
    }, [loginUser, getAuthHeaders])

    return (

                <div className="container text-center">
                    <h1>This is a admin only page</h1>
                    <p>Message from a protected and admin only API: {adminMessage}</p>
                </div>


    )
}
