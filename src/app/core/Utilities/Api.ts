/**
 * URL del endpoint utilizado para verificar la validez de un token de autenticación.
 * 
 * Esta constante se construye añadiendo 'verifyToken.php' a la URL base de sesión (`MAIN_SESSION_URL`).
 * Normalmente se utiliza en solicitudes API para confirmar que el token de sesión de un usuario sigue siendo válido y no ha expirado ni ha sido revocado.
 *
 * @notas
 * Asegúrate de que `MAIN_SESSION_URL` esté correctamente definido y apunte al servicio backend adecuado antes de usar este endpoint.
 *
 */
//TODO:  modificar para saber si sera en local o en servidor
const MAIN_URL = 'http://localhost/Estadia/';

const MAIN_API_URL = MAIN_URL + 'API/';

const MAIN_SESSION_URL = MAIN_URL + 'session/';

export const API_ALUMNOS = MAIN_API_URL + 'alumnos.php';

export const API_VACUNAS = MAIN_API_URL + 'vacunas.php';

export const API_CONSULTAS = API_VACUNAS;

export const API_CONFERENCIAS = MAIN_API_URL + 'conferencia.php';

//TODO: a considerar si se necesita unificar las APIs de asistencia y conferencias
export const API_ASISTENCIA = MAIN_API_URL + 'asistencia.php';

export const API_MEDICALSHIFT = MAIN_API_URL + 'medicalshift.php';
export const API_TOKEN_VERIFIER = MAIN_SESSION_URL + 'verifyToken.php';
export const API_TOKEN_REFRESH = MAIN_SESSION_URL + 'refrehToken.php';
export const API_SESSION = MAIN_SESSION_URL + 'index.php';

export const API_MEDICALSHIFTFORM = MAIN_API_URL + 'jornadas_form.php';