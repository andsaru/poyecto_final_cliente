import { useForm } from "../../hooks/useForm";
import { EMPLOYEE_URL } from "../../config/config";
import { useAuthContext } from "../../context/AuthContext";
import {useState, useEffect} from "react";

export default function AdminPut() {
    
    const formInitialState = {email: admin_user.email, first_name: admin_user.first_name, last_name: admin_user.last_name, phone: admin_user.phone, class_shift: admin_user.class_shift, shift_duration: admin_user.shift_duration};    
    const [form, handleChange] = useForm(formInitialState);

    const { getAuthHeaders } = useAuthContext(); 
     
    const handleSubmit = async e => {
        e.preventDefault();
        
        const options = {
            method: "PUT",
            headers: getAuthHeaders({"Content-type": "application/json"}),
            body: JSON.stringify(form)
        }

        
        const response = await fetch(EMPLOYEE_URL + "/" + admin_user.id, options);
        const data = await response.json();

    }

    const handleDelete = async e => {
        e.preventDefault();
        
        const options = {
            method: "DELETE",
            headers: getAuthHeaders({"Content-type": "application/json"}),
           
        }
        
        const response = await fetch(TEACHERS_URL + "/" + teacher.id, options);
        const data = await response.json();
    }

    return (
        <div>
            <h3>Modificar Empleado</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="nameInput">email</label>
                    <input onChange={handleChange} value={form.email} name="email"/>
                </div>
                <div>
                    <label for="descriptionInput">Código</label>
                    <input onChange={handleChange} value={form.first_name} name="first_name"/>
                </div>
                <div>                                            
                </div>
                <div>
                    <label for="durationInput">Nombre</label>
                    <input onChange={handleChange} value={form.last_name} name="last_name"/>
                </div>
                <div>
                    <label for="durationInput">Contraseña</label>
                    <input onChange={handleChange} value={form.password} name="password"/>
                </div>
                <div>
                    <label for="priceInput">Teléfono</label>
                    <input onChange={handleChange} value={form.phone} name="phone"/>
                </div> 
                <div>
                    <label for="priceInput">Turno</label>
                    <input onChange={handleChange} value={form.class_shift} name="class_shift"/>
                </div>
                <div>
                    <label for="priceInput">Horas</label>
                    <input onChange={handleChange} value={form.shift_duration} name="shift_duration"/>
                </div>
                <button>Actualizar empleado</button>  
                <button onClick={handleDelete}>Eliminar</button>            
            </form>
            
        </div>
    )
}
