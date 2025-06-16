<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../conexion.php';
require_once '../session/TokenUtility.php';

if (!Token::verifyCookieValid()) {

    http_response_code(401);
    echo json_encode(['error' => 'token invalido']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(204);
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
            'fileName' => $archivo['name']
        ]);
    } else {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(['error' => 'Algo fallo al subir el archivo']);
    }


} else {
    http_response_code(403);
    echo json_encode(['error' => 'solicitud no encontrada']);
}

