<?php


header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST,OPTIONS");
header('Content-Type: application/json');
require_once '../conexion.php';
require_once '../session/TokenUtility.php';


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

} else {
    http_response_code(403);
    echo json_encode(['error' => 'solicitud no encontrada']);
}

