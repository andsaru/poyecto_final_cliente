import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { EMPLOYEE_URL } from "../../config/config";
import { useAuthContext } from "../../context/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown'
import AdminPost from "./AdminPost";
import AdminPut from "./AdminPut";
import jwt_decode from "jwt-decode";

import '../styles/dashboard.css';

export default function Admin() {

  const { getAuthHeaders, loginUser } = useAuthContext();
  const [users, setUsers] = useState([]);
  const { signIn, isAuthenticated } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    const options = { headers: getAuthHeaders() };

    fetch(EMPLOYEE_URL, options)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(err => {
        console.log(err, "You are not authorized to see this.");
        return <Redirect to="/" />;
      });
  }, [loginUser, getAuthHeaders])

  

  return (

    <div className="container text-center pt-5">

      <div className="row">
        {users.map((admin_user) => {
          return (
            <ul className="list-group mb-3 col-12 col-sm-6 col-xl-3" key={admin_user.id}>
              <li className="list-group-item active">Empleado </li>
              <li className="list-group-item">{admin_user.email}</li>
              <li className="list-group-item">{admin_user.first_name}</li>
              <li className="list-group-item">{admin_user.last_name}</li>
              <li className="list-group-item">{admin_user.phone}</li>
              <li className="list-group-item">{admin_user.class_shift}, {admin_user.shift_duration}</li>
              <li className="list-group-item">

                <div><AdminPut admin_user={admin_user} /></div>

                {/* <div><AdminPut admin_user={admin_user} /></div> */}
                {/* <button className="btn btn-warning" id={admin_user.id} onClick={handleDelete}>Eliminar</button> */}

              </li>
            </ul>
          );
        })}
      </div>
      <h2 className="my-4">Nuevo contacto</h2>
      <AdminPost />
    </div>
  );
}
