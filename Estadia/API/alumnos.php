<?php
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
} else if (isset($_GET['mtr'])) {
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
} else if (isset($_GET['getallHeadersFiles'])) {

} else if (isset($_GET['gFile'])) {

    $pdfFile = '../documents/' . $_POST['mtr'] . '/' . $_POST['fileName'];

    if (file_exists($pdfFile)) {

        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . basename($pdfFile) . '"');
        header('Content-Length: ' . filesize($pdfFile));
        readfile($pdfFile);
        exit;
    } else {
        header("HTTP/1.0 404 Not Found");
        echo "PDF no encontrado";
    }
} else if (isset($_GET['uploadFile'])) {



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
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'Archivo subido correctamente',
            'data' => [
                'fileName' => $archivo['name']
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

