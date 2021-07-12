import { useEffect, useState } from "react"
import { Redirect } from "react-router";
import { ADMIN_URL } from "../config/config";
import { EMPLOYEE_URL } from "../config/config";
import { useAuthContext } from "../context/AuthContext";

import './styles/dashboard.css';

export default function Admin() {

    const { getAuthHeaders, loginUser } = useAuthContext();
    const [adminMessage, setAdminMessage] = useState("");

    const [email, setEmail] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [password, setPassword] = useState("");
        const [phone, setPhone] = useState("");
        const [classShift, setClassShift] = useState("");
        const [shiftDuration, setShiftDuration] = useState("");
        // const [state, postUser] = useForm();

        const handleSubmit = async e => {
          e.preventDefault();
          
          const options = {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(email, firstName, lastName, password, phone, classShift, shiftDuration)
          }
              const response = await fetch(EMPLOYEE_URL, options);
              const data = await response.json();  
        }
      
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

        </form>
                </div>


    )
}
