import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { EMPLOYEE_URL } from "../../config/config";
import { useAuthContext } from "../../context/AuthContext";
import AdminPost from "./AdminPost";

import '../styles/dashboard.css';

export default function Admin() {

  const { getAuthHeaders, loginUser } = useAuthContext();
  const [admin_user, setAdmin_User] = useState([]);

  useEffect(() => {
    const options = { headers: getAuthHeaders() };

    fetch(EMPLOYEE_URL, options)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      .then(data => setAdmin_User(data))
      .catch(err => {
        console.log(err, "You are not authorized to see this.");
        return <Redirect to="/" />;
      });
  }, [loginUser, getAuthHeaders])

  const handleDelete = async e => {
    e.preventDefault();

    const options = {
      method: "DELETE",
      headers: getAuthHeaders({ "Content-type": "application/json" }),

    }

    const response = await fetch(EMPLOYEE_URL + "/" + admin_user.id, options);
    const data = await response.json();
  }

  return (

    <div className="container text-center pt-5">

      <div className="row">
        {admin_user.map((admin_user) => {
          return (
            <ul className="list-group mb-3 col-12 col-sm-6 col-xl-3" key={admin_user.id} >
              <li className="list-group-item active">Empleado </li>
              <li className="list-group-item">{admin_user.email}</li>
              <li className="list-group-item">{admin_user.first_name}</li>
              <li className="list-group-item">{admin_user.last_name}</li>
              <li className="list-group-item">{admin_user.phone}</li>
              <li className="list-group-item">{admin_user.class_shift}, {admin_user.shift_duration}</li>
              <li className="list-group-item">
                <button className="btn btn-warning" onClick={handleDelete}>Eliminar</button>
              </li>
            </ul>
          );
        })}
      </div>
      <h2 className="my-4">Nuevo contactor</h2>
      <AdminPost  />
    </div>
  );
}
