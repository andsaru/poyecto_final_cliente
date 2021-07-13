import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

export default function AdminGet() {

    const [admin_user, setAdmin_User] = useState([]);

    const {id} = useParams();

    const EMPLOYEES_URL = "http://localhost:8000/api/amazing-employees/"; 

    useEffect(() => {
        fetch(`${EMPLOYEES_URL}${id}`)
        .then(response => response.json())
        .then(data=>setAdmin_User(data))      
    }, [])

    return (

            <div className="container text-center pt-5">
                <h3>Email: {admin_user.email} </h3>
                <h3>Código: {admin_user.first_name} </h3>
                <h3>Nombre: {admin_user.last_name}</h3>
                <h3>Contraseña: {admin_user.password}</h3>
                <h3>Teléfono: {admin_user.phone}</h3>
                <h3>Turno: {admin_user.class_shift}</h3>
                <h3>Horas: {admin_user.shift_duration}</h3>
            </div>
        );
}
