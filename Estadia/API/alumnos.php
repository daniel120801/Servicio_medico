<?php
/**
 * API para la gestión de alumnos.
 *
 * Este archivo proporciona múltiples endpoints para interactuar con la base de datos de alumnos,
 * incluyendo operaciones de consulta, actualización, búsqueda y gestión de archivos/documentos.
 *
 * Endpoints disponibles (según parámetros GET):
 *
 * - allheaders: Obtiene una lista de alumnos con los campos básicos.
 * - mtr: Obtiene la información detallada de un alumno por matrícula, incluyendo vacunas, conferencias y documentos.
 * - gFile: Descarga un archivo PDF asociado a un alumno.
 * - uploadFile: Sube un archivo y lo asocia a un alumno, registrando el documento en la base de datos.
 * - modStat: Actualiza un campo específico del alumno por matrícula.
 * - modAllStats: Actualiza múltiples campos del alumno por matrícula.
 * - search: Realiza búsquedas paginadas de alumnos por nombre, matrícula o carrera.
 *
 * Seguridad:
 * - Requiere verificación de token mediante cookie para todas las operaciones.
 * - Responde con códigos HTTP apropiados y mensajes en formato JSON.
 *
 * Cabeceras CORS:
 * - Permite solicitudes desde http://localhost:4200 con credenciales.
 *
 * Dependencias:
 * - require_once '../conexion.php'
 * - require_once '../session/TokenUtility.php'
 *
 * @author  Tu Nombre o Equipo
 * @version 1.0
 * @package API
 */
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST,OPTIONS");
header('Content-Type: application/json');
require_once '../conexion.php';
require_once '../session/TokenUtility.php';

$limit_rows = 10;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(204);
    exit;
}
$resultVerifyToken = Token::verifyCookieValid();
if ($resultVerifyToken != 'decoded') {
    http_response_code(401);
    echo json_encode([
        'status' => 'failed',
        'message' => $resultVerifyToken,
        'data' => null
    ]);
    exit;
}

$con = new Conexion(array(
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
));
if (isset($_GET['allheaders'])) {
    $select = $con->select("alumnos", "matricula,nombre,matricula,carrera");
    header("Content-Type: application/json");
    $alumno = $select->execute();
    echo json_encode($alumno);
    exit;
} elseif (isset($_GET['mtr'])) {
    $mtr = $_GET['mtr'];


    if (empty($mtr)) {
        http_response_code(400);
        echo json_encode(['error' => 'Matricula del alumno no válido']);
        exit;
    }
    $select = $con->select("all_alumno ");
    $select->where("matricula", "=", $mtr);

    $alumno = $select->execute();

    if ($alumno && count($alumno) > 0) {
        $alumno = $alumno[0];
    } else {
        $alumno = null;
    }
    try {
        $alumno['vacunas'] = $alumno['vacunas_json'] ? json_decode('[' . $alumno['vacunas_json'] . ']', true) : [];


    } catch (Exception $e) {

        $alumno['vacunas'] = [];
    }
    try {
        $alumno['conferencias'] = $alumno['conferencias_json'] ? json_decode('[' . $alumno['conferencias_json'] . ']', true) : [];
    } catch (Exception $e) {
        $alumno['conferencias'] = [];
    }
    try {
        $alumno['documentos'] = $alumno['documento_json'] ? json_decode('[' . $alumno['documento_json'] . ']', true) : [];
    } catch (Exception $e) {
        $alumno['documentos'] = [];
    }

    // Eliminar campos JSON crudos (opcional)
    unset($alumno['vacunas_json'], $alumno['22'], $alumno['21'], $alumno['23'], $alumno['conferencias_json'], $alumno['documento_json']);

    // Mostrar resultados (o enviar como API)
    header('Content-Type: application/json');

    echo json_encode($alumno, JSON_PRETTY_PRINT);
    exit;
} elseif (isset($_GET['gFile'])) {

    $file = '../documents/' . $_POST['mtr'] . '/' . $_POST['fileName'];

    if (file_exists($file)) {

        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . basename($file) . '"');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    } else {
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['error' => 'Documento no encontrado']);
    }
} elseif (isset($_GET['uploadFile'])) {


    if (!isset($_POST['mtr'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta matricula']);
        exit;
    }
    if (!isset($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No se ha enviado ningún archivo']);
        exit;
    }

    $archivo = $_FILES['file'];

    if ($archivo['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'Error al subir el archivo: ' . $archivo['error']]);
        exit;
    }
    if (!file_exists('../documents')) {
        mkdir('../documents');
    }
    if (!file_exists('../documents/' . $_POST['mtr'])) {
        mkdir('../documents/' . $_POST['mtr']);
    }
    if (!move_uploaded_file($archivo['tmp_name'], '../documents/' . $_POST['mtr'] . '/' . $archivo['name'])) {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(['error' => 'Algo fallo al subir el archivo']);

    }


    $insert = $con->insert('documento', 'nombre,alumno_mtr');
    $insert->value($archivo['name']);
    $insert->value($_POST['mtr']);


    if ($insert->execute()) {

        $selectID = $con->select('documento', 'id');
        $selectID->orderby("id DESC ");
        $selectID->limit("1");
        $lastID = $selectID->execute();
        $id = 1;
        if (count($lastID) > 0) {
            $id = $lastID[0][0];
        }
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'Archivo subido correctamente',
            'data' => [
                'fileName' => $archivo['name'],
                'idFile' => $id
            ]
        ]);
    } else {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Algo fallo al subir el archivo'
        ]);
    }


} elseif (isset($_GET['rmfile'])) {

    if (!isset($_POST['mtr']) && !isset($_POST['id_file'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta matricula']);
        exit;

    }
    $select = $con->select('documento', "nombre");
    $select->where('alumno_mtr', "=", $_POST['mtr']);
    $select->where_and('id', "=", $_POST['id_file']);
    $result = $select->execute();
    if (count($result) == 0) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Archivo no encontrado',
            'data' => $result
        ]);
        exit;
    }

    $archivo = '../documents/' . $_POST['mtr'] . '/' . $result[0]['nombre'];
    if (file_exists($archivo)) {
        $delete = new Delete($con, "DELETE FROM documento");
        $delete->where('id', "=", $_POST['id_file']);
        $res = $delete->execute();
        if (!$res > 0) {
            http_response_code(400);
            echo json_encode([
                'status' => 'failed',
                'message' => 'No se logro eliminar el archivo',
                'data' => null
            ]);
            exit;
        }
        if (unlink($archivo)) {

            http_response_code(200);
            echo json_encode([
                'status' => 'success',
                'message' => 'Eliminado correctamente',
                'data' => null
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                'status' => 'failed',
                'message' => 'No se logro eliminar el archivo',
                'data' => null
            ]);
            exit;
        }
    } else {
        $delete = new Delete($con, "DELETE FROM documento");
        $delete->where('alumno_mtr', "=", $_POST['mtr']);
        $delete->where_and('id', "=", $_POST['id_file']);
        $result = $delete->execute();


        http_response_code(400);
        echo json_encode([
            'status' => 'failed',
            'message' => 'Archivo no encontrado',
            'data' => $archivo
        ]);
    }




} elseif (isset($_GET['modStat'])) {
    $value = $_POST['value'];
    $field = $_POST['field'];
    $mtr = $_POST['mtr'];

    $update = $con->update('alumnos');
    $update->set($field, $value);
    $update->where('matricula', '=', $mtr);
    $res = $update->execute();

    if ($res > 0) {

        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'actualización correcta',
            'data' => null
        ]);
    } else {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode([
            'status' => 'failed',
            'message' => 'No se actualizo',
            'data' => null
        ]);
    }
} elseif (isset($_GET['modAllStats'])) {
    if (!isset($_POST['mtr'])) {
        echo json_encode([
            'status' => 'failed',
            'message' => 'matricula necesaria',
            'data' => null
        ]);
        exit;
    }
    $update = $con->update('alumnos');
    foreach ($_POST as $key => $value) {
        if ($key == 'mtr') {
            continue;
        }
        $update->set($key, $value);
    }
    $update->where('matricula', '=', $_POST['mtr']);
    $res = $update->execute();

    if ($res > 0) {

        //TODO:agregar todos los campos faltantes
        echo json_encode([
            'status' => 'success',
            'message' => 'actualización correcta',
            'data' => null
        ]);
    } else {
        echo json_encode([
            'status' => 'failed',
            'message' => 'error al actualizar',
            'data' => null
        ]);
    }

} elseif (isset($_GET['search'])) {

    if (!isset($_POST['field'])) {
        echo json_encode([
            'status' => 'failed',
            'message' => 'campo de busqueda no especificado',
            'data' => null
        ]);
        exit;
    }

    $pag = isset($_POST['pag']) && is_numeric($_POST['pag']) ? $_POST['pag'] : 0;

    if ($_POST['field'] == 'all') {
        $select = $con->select("alumnos a", " a.matricula,a.nombre,a.carrera, total.total_count  AS total ");
        $select->crossjoin("(SELECT COUNT(*) AS total_count FROM alumnos) AS total");
        $select->limit(" $limit_rows OFFSET $pag");
        $res = $select->execute();
        echo json_encode([
            'status' => 'success',
            'message' => '',
            'data' => $res
        ]);
        exit;
    }


    $isValidREquest = isset($_POST['field']) && isset($_POST['value']) && isset($_POST['pag']);

    if (!$isValidREquest) {
        echo json_encode([
            'status' => 'failed',
            'message' => 'parametros faltantes',
            'data' => null
        ]);
        exit;
    }

    $field = $_POST['field'];
    $value = $_POST['value'];
    $pag = $_POST['pag'];
    $select = $con->select("alumnos a", " a.matricula,a.nombre,a.carrera, total.total_count  AS total ");
    $select->crossjoin("(SELECT COUNT(*) AS total_count FROM alumnos) AS total");
    $select->limit(" $limit_rows OFFSET $pag");
    switch ($field) {
        case 'n':
            $select->where("nombre", "LIKE", "%$value%");
            break;
        case 'mtr':
            if (!is_numeric($value)) {
                echo json_encode([
                    'status' => 'failed',
                    'message' => 'matricula no valida',
                    'data' => null
                ]);
                exit;
            }
            $select->where("matricula", "LIKE", "%$value%");
            break;
        case 'c':
            $select->where("carrera", "LIKE", "%$value%");
            break;

        default:
            echo json_encode([
                'status' => 'failed',
                'message' => 'campo de busqueda invalido',
                'data' => null
            ]);
            exit;
    }
    $res = $select->execute();
    echo json_encode([
        'status' => 'success',
        'message' => '',
        'data' => $res
    ]);

} else {
    http_response_code(403);
    echo json_encode(['error' => 'solicitud no encontrada']);
}

