/**
 * Constantes globales que son susceptibles de cambiar
 * en el futuro y que queremos tener localizadas.
 */

 const PORT = 8000;
 const BASE_API_URL = `http://localhost:${PORT}/api/`;
 const LOGIN_URL = BASE_API_URL + "login_check";
 const EMPLOYEE_URL = BASE_API_URL + "amazing-employees";
 const SESSION_URL = BASE_API_URL + "session";
 const PRIVATE_URL = BASE_API_URL + "private";
 const ADMIN_URL = BASE_API_URL + "admin";
 
 export {
     BASE_API_URL,
     LOGIN_URL,
     SESSION_URL,
     PRIVATE_URL,
     ADMIN_URL,
     EMPLOYEE_URL
 };