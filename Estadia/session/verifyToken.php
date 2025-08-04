/**
 * Verifica la validez de un token JWT enviado en la cabecera Authorization.
 *
 * Este script maneja solicitudes CORS y verifica el token JWT usando la clave "Estadia_2025" y el algoritmo HS256.
 * Si la solicitud es de tipo OPTIONS, responde con éxito para el preflight.
 * Si el token es válido, responde con estado 200 y el tiempo restante de expiración.
 * Si el token es inválido o no se encuentra, responde con estado 401 y un mensaje de error.
 *
 * Requiere la librería firebase-php-jwt.
 *
 * @return  JSON con el estado de la verificación y el tiempo restante de expiración del token.
 */
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