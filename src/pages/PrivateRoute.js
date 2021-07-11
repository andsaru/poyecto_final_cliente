import { Redirect, Route } from "react-router";
import { useAuthContext } from "../context/AuthContext";


export default function AdminRoute({ children, ...rest }) {

    const { isAuthenticated, isAdmin } = useAuthContext();   

    return (
        <Route {...rest} render={() => {
            return isAuthenticated && isAdmin()
                ? children
                : <Redirect exact to="/dashboard" />
        }} />
    )
}