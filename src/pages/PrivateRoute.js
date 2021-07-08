import { Redirect, Route } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, ...rest }) {

    const { isAuthenticated } = useAuthContext();

    return (
        <Route {...rest} render={() => {
            return isAuthenticated
                ? children
                : <Redirect exact to="/" />
        }} />
    )
}