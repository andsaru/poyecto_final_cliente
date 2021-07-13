import { EMPLOYEE_URL } from "../../config/config";
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../context/AuthContext";

import React from 'react';

export default function AdminPost() {

    const formInitialState = { email: "", first_name: "", last_name: "", password: "", phone: "", class_shift: "", shift_duration: "" };
    const [form, handleInputChange] = useForm(formInitialState)

    const { getAuthHeaders } = useAuthContext();


    const handleSubmit = async e => {
        e.preventDefault();

        console.log(form);

        const options = {
            method: "POST",
            headers: getAuthHeaders({ "Content-type": "application/json" }),
            body: JSON.stringify(form)
        }
        const response = await fetch(EMPLOYEE_URL, options);
        const data = await response.json();

        if (response.status >= 200 && response.status < 300) {

            alert("Usuario nuevo creado");
        }
    }

    return (

        <form className="form-group" onSubmit={handleSubmit}>
            <input className="form-control mb-3" onChange={handleInputChange} value={form.email} id="email" name="email" placeholder="Introduce el nombre" />
            <input className="form-control mb-3" onChange={handleInputChange} value={form.first_name} id="first_name" name="first_name" placeholder="Introduce el código" />
            <input className="form-control mb-3" onChange={handleInputChange} value={form.last_name} type="text" id="last_name" name="last_name" placeholder="Introduce el nombre" />
            <input className="form-control mb-3" onChange={handleInputChange} value={form.password} type="password" id="password" name="password" placeholder="Introduce el password" />
            <input className="form-control mb-3" onChange={handleInputChange} value={form.phone} type="number" id="phone" name="phone" placeholder="Introduce el teléfono de contacto" />
            <input className="form-control mb-3" onChange={handleInputChange} value={form.class_shift} type="text" id="class_shift" name="class_shift" placeholder="Introduce el turno" />
            <input className="form-control mb-3" onChange={handleInputChange} value={form.shift_duration} type="number" id="shift_duration" name="shift_duration" placeholder="Introduce el horario" />
            <button type="submit" className="btn btn-success" >Create user</button>
        </form>
    )
}
