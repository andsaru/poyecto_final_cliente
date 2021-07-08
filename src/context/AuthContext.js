import { createContext, useState, useContext, useEffect } from "react";
import { SESSION_URL } from "../config/config";

const LoginContext = createContext(null);

export default function AuthContext({children}) {
    /**
     * Contexto que gestionará toda la autenticación de nuestra aplicación.
     * Paciencia, que este archivo no es fácil y requiere su tiempo.
     * 
     * Consta de dos estados: uno con la información del usuario logueado (un obj) y
     * un booleano para facilitar comprobaciones.
     * 
     * Cuenta con algunas funciones de ayuda que no son estrictamente necesarias
     * pero que simplifican el código en el resto de la aplicación.
     */

    const [loginUser, setLoginUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /**
     * Tres funciones que interactúan con el localStorage, se han hecho para 
     * que sea sencillo cambiar de método en el futuro. Si decidiéramos guardar
     * el token en una cookie, por ejemplo, sólo tendríamos que cambiar estas
     * tres funciones y el resto del programa no se daría cuenta del cambio.
     */
    const getToken = () => localStorage.getItem("TOKEN_KEY");
    const setToken = token => localStorage.setItem("TOKEN_KEY", token);
    const removeToken = () => localStorage.removeItem("TOKEN_KEY");

    const isAdmin = () => loginUser.roles.includes("ROLE_ADMIN");

    const signIn = (token, user) => {
        /**
         * Gestiona todo el proceso de login:
         * Guarda el token y actualiza los dos estados
         */
        setToken(token);
        setLoginUser(user);
        setIsAuthenticated(true);
    }

    const signOut = () => {
        /**
         * Gestiona todo el proceso de logout:
         * Elimina el token y reinicia los estados.
         */
        removeToken();
        setLoginUser({});
        setIsAuthenticated(false);
    }

    const getAuthHeaders = (headers = {}) => {
        /**
         * Construye un objeto con los headers ya configurados a partir
         * del token, listo para ser introducido en las opciones de un fetch.
         * 
         * Además, recibe un argumento headers, por si hubiera cabeceras previas
         * aparte del token. Se usa un valor por defecto, si no se "pasa" 
         * el argumento headers, éste será un objeto vacío por defecto en lugar de undefined gracias a "headers = {}"
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
         */
        return {...headers, Authorization: `Bearer ${getToken()}`}
    };

    useEffect(() => {
        /**
         * Al utilizar este componente en App.js, se montará en cuanto accedamos
         * a la aplicación, ejecutando, por tanto, este useEffect. Útil cuando
         * volvemos a la aplicación tras haber salido o haber cerrado el navegador.
         * 
         * Comprueba que existe un token en el localStorage y lo valida contra el servidor
         * para añadir una capa de seguridad necesaria, ya que:
         * 
         * ¿Qué pasa si tengo un token guardado pero ha expirado?
         * ¿Qué pasa si tengo un token válido pero han eliminado mi usuario de la BBDD?
         * ¿Qué pasa si tengo un token válido pero me han cambiado los roles u otra información importante?
         * 
         * En ninguno de los casos debería poder acceder a zonas privadas de la web, por lo
         * que una validación contra el servidor y actualización de la información es siempre necesaria.
         */
        
        const options = {
            headers: getAuthHeaders()
        };

        // Si ni siquiera hay token guardado, no hacemos la petición
        getToken() && fetch(SESSION_URL, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => signIn(data.token, data.user)) // Token e info renovada
            .catch(() => signOut()); // Limpiamos la sesión
        
        // El siguiente comentario (eslint...) es para deshabilitar el warning de "missing dependencies"
        // ya que no necesitamos incluir las dependencias que nos pide en este caso.

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    const contextValue = {
        loginUser,
        isAuthenticated,
        isAdmin,
        getToken,
        signIn,
        signOut,
        getAuthHeaders
    };

    // /**
    //  * Envuelve a todos los hijos con el Provider del contexto, enviando 
    //  * por value un objeto con todas las propiedades / funciones
    //  * que se quieran exponer en el árbol.
    //  */

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
}

/**
 * En lugar de exportar el contexto, podemos exportar un pequeño custom hook
 * que utiliza directamente el contexto LoginContext para simplificar el uso
 * en el resto de archivos. Es muy común aunque es opcional.
 */
const useAuthContext = () => useContext(LoginContext);

export {useAuthContext};