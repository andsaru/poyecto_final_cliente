import { useEffect, useState } from "react"
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { PRIVATE_URL } from "../config/config";
import { BASE_API_URL } from "../config/config";
import { useAuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

export default function CreateUser() {
    const { signOut, getAuthHeaders, loginUser, isAdmin } = useAuthContext();
    const [privateMessage, setPrivateMessage] = useState("");

        const [email, setEmail] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [password, setPassword] = useState("");
        const [phone, setPhone] = useState("");
        const [classShift, setClassShift] = useState("");
        const [shiftDuration, setShiftDuration] = useState("");
        const [state, postUser] = useFetch();
      
        function handleInputChange(event) {
          if (event.target.name === "email") {
            setEmail(event.target.value);
          }
          if (event.target.name === "first_name") {
            setFirstName(event.target.value);
          }
          if (event.target.name === "last_name") {
            setLastName(event.target.value);
          }

          if (event.target.name === "password") {
            setPassword(event.target.value);
          }

          if (event.target.name === "phone") {
            setPhone(event.target.value);
          }

          if (event.target.name === "class_shift") {				
            setClassShift(event.target.value);
          }

          if (event.target.name === "shift_duration") {
            setShiftDuration(event.target.value);
          }
        }

        function handleSubmit(event) {
          event.preventDefault();
          postUser({
            url: "http://localhost:8000/api/amazing-employees",
            method: "POST",
            body: JSON.stringify({ email, firstName, lastName, password, phone, classShift, shiftDuration })
          });
        }

    // useEffect(() => {
    //     const options = {headers: getAuthHeaders()};

    //     fetch(PRIVATE_URL, options)
    //     .then(response => {
    //         /**
    //          * Si hay algun error (no autorizado, token inválido...) lanzamos un error
    //          * para que no se procesen los datos y caiga en el catch. Si va
    //          * todo bien, procesamos los datos como siempre.
    //          */
    //         if(!response.ok) throw new Error(response.statusText)
    //         return response.json();
    //     })
    //     .then(data => setPrivateMessage(data.message))
    //     .catch(error => {
    //         /**
    //          * Si ha habido problemas con el acceso a los datos privados, cerramos la sesión 
    //          * y redirigimos el usuario al login.
    //          */
    //         console.error(error); // Los console.log están prohibidos en producción!
    //         signOut();
    //         return <Redirect to="/" />;
    //     });

    //     // El siguiente comentario (eslint...) es para deshabilitar el warning de "missing dependencies"
    //     // ya que no necesitamos incluir las dependencias que nos pide en este caso.

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Email</label>
                <input onChange={handleInputChange} value={email} name="email" />
            </p>
            <p>
                <label>First Name</label>
                <input onChange={handleInputChange} value={firstName} name="first_name" />
            </p>
            <p>
                <label>Last Name</label>
                <input onChange={handleInputChange} value={lastName} name="last_name" />
            </p>

            <p>
                <label>Password</label>
                <input onChange={handleInputChange} value={password} name="password" />
            </p>

            <p>
                <label>Phone</label>
                <input onChange={handleInputChange} value={phone} name="phone" />
            </p>

            <p>
                <label>Class Shift</label>
                <input onChange={handleInputChange} value={classShift} name="class_shift" />
            </p>

            <p>
                <label>Shift Duration</label>
                <input onChange={handleInputChange} value={shiftDuration} name="shift_duration" />
            </p>
            <button type="submit">Create user</button>
            {state.isLoading && <div>Creating user</div>}
            {state.isFailed && <div>Error creating user</div>}
            {state.isSuccess && <div>User created successfully</div>}
            {isAdmin() && <NavLink to="/admin">Go to Admin Page (This is only visible if you are admin)</NavLink>}
        </form>
    );
    // <div className="container text-center pt-5">
    //     <h1>This is a private Dashboard. Welcome {loginUser?.email}</h1>
    //     <p>Message from a protected API: {privateMessage}</p>
    //     {isAdmin() && <NavLink to="/admin">Go to Admin Page (This is only visible if you are admin)</NavLink>}
    // </div>
    // )
}
