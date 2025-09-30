<?php


header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST,OPTIONS");
header('Content-Type: application/json');
require_once '../conexion.php';

$con = new Conexion(array(
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
));

$directory = '../jornadas_medicas';

if (isset($_GET['allheaders'])) {
    $select = $con->select("jornadamedica", "access_code");
    $result = $select->execute();

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'data' => $result,
    ]);

}
elseif(isset($_GET['saveForm'])) {
    // Guardar registro de formulario en carpeta por access_code y con nombre CURP.json
    $input = $_POST;
    if (!isset($input['access_code'])) {
        http_response_code(400);
        echo json_encode(['status' => 'failed', 'message' => 'access_code faltante']);
        exit;
    }
    if (!isset($input['CURP']) || empty($input['CURP'])) {
        http_response_code(400);
        echo json_encode(['status' => 'failed', 'message' => 'CURP faltante']);
        exit;
    }
    $folderPath = $directory . '/' . $input['access_code'];
    if (!is_dir($folderPath)) {
        mkdir($folderPath, 0777, true);
    }
    $CURP = preg_replace('/[^A-Za-z0-9]/', '', $input['CURP']);
    $filename = $folderPath . '/' . $CURP . '.json';
    $contenido = json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents($filename, $contenido) !== false) {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Registro guardado', 'file' => basename($filename)]);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'failed', 'message' => 'No se pudo guardar el archivo']);
    }
}
 else {
    http_response_code(403);
    echo json_encode(['error' => 'solicitud no encontrada']);
}

