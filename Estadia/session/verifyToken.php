<?php

require "firebase-php-jwt/vendor/autoload.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Allow: GET, POST, OPTIONS");
header('Content-Type: application/json');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Manejar preflight (opcional, pero recomendado)
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'preflight request handled'
    ]);
    exit();
}

$headers = getallheaders();

if (!isset($headers["Authorization"])) {
    http_response_code(401);
    echo json_encode([
        'status' => 'failed',
        'message' => 'no se encontró el token de autorización'
    ]);
    exit;
}

$token = str_replace("Bearer ", "", $headers["Authorization"]);

try {
    $decoded = JWT::decode($token, new Key("Estadia_2025", "HS256"));
    // Obtener el tiempo de expiración (exp) del token
    $exp = isset($decoded->exp) ? $decoded->exp : null;
    $timeLeft = $exp ? $exp - time() : null;

    //TODO: quitar explode
    $usuario = explode("/", $decoded->sub);
    $id = $usuario[0];

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'token verificado correctamente',
        'expires_in' => $timeLeft // tiempo restante en segundos
    ]);

} catch (Exception $error) {
    http_response_code(401);
    echo json_encode([
        'status' => 'failed',
        'message' => 'token inválido o expirado',
    ]);
}

?>