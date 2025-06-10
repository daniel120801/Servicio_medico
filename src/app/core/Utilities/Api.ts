
const MAIN_URL = 'http://localhost/Estadia/';

const MAIN_API_URL = MAIN_URL + 'API/';

const MAIN_SESSION_URL = MAIN_URL + 'session/';

export const API_ALUMNOS = MAIN_API_URL + 'alumnos.php';

export const API_VACUNAS = MAIN_API_URL + 'vacunas.php';

export const API_CONFERENCIAS = MAIN_API_URL + 'conferencias.php';

//TODO: a considerar si se necesita unificar las APIs de asistencia y conferencias
export const API_ASISTENCIA = MAIN_API_URL + 'asistencia.php';


export const API_TOKEN = MAIN_SESSION_URL + 'verifyToken.php';
export const API_LOGIN = MAIN_SESSION_URL + 'index.php';
