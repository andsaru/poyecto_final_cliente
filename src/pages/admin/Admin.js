import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { ADMIN_URL } from "../../config/config";
import { EMPLOYEE_URL } from "../../config/config";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AdminGet from "./AdminGet";

import '../styles/dashboard.css';

export default function Admin() {

  const { getAuthHeaders, loginUser } = useAuthContext();
  const [admin_users, setAdmin_Users] = useState([]);

  useEffect(() => {
    const options = { headers: getAuthHeaders() };

    fetch(EMPLOYEE_URL, options)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      .then(data => setAdmin_Users(data))
      .catch(err => {
        console.log(err, "You are not authorized to see this.");
        return <Redirect to="/" />;
      });
  }, [loginUser, getAuthHeaders])

    return (

        <div className="container text-center pt-5">
            {/* <h3>Email: {admin_users.email} </h3>
            <h3>Código: {admin_users.first_name} </h3>
            <h3>Nombre: {admin_users.last_name}</h3>
            <h3>Contraseña: {admin_users.password}</h3>
            <h3>Teléfono: {admin_users.phone}</h3>
            <h3>Turno: {admin_users.class_shift}</h3>
            <h3>Horas: {admin_users.shift_duration}</h3> */}

            <div className="row">
                {admin_users.map((admin_users) => {
                    return (
                        <ul className="list-group mb-3 col-12 col-sm-6 col-xl-3" key={admin_users.id} >
                            <li className="list-group-item active">Empleado </li>
                            <li className="list-group-item">{admin_users.email}</li>
                            <li className="list-group-item">{admin_users.first_name}</li>
                            <li className="list-group-item">{admin_users.last_name}</li>
                            
                            <li className="list-group-item">{admin_users.phone}</li>
                            
                            <li className="list-group-item">{admin_users.class_shift}, {admin_users.shift_duration}</li>
                            <li className="list-group-item">
                           <button className="btn btn-warning" /* onClick={removeContact(admin_user.id)} */>Eliminar</button>
                            </li>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
}
