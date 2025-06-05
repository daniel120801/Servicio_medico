<?php

require "firebase-php-jwt/vendor/autoload.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Allow: GET, POST, OPTIONS");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Manejar preflight (opcional, pero recomendado)
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

$headers = getallheaders();

if (!isset($headers["Authorization"])) {
    http_response_code(401);
    echo "Token requerido.";
    exit;
}

$token = str_replace("Bearer ", "", $headers["Authorization"]);

try {
    $decoded = JWT::decode($token, new Key("Test12345", "HS256"));
    # header("Content-Type: application/json");
    # echo json_encode(array("message" => "Acceso autorizado", "user_id" => $decoded->sub));
    $usuario = explode("/", $decoded->sub);
    $id = $usuario[0];
    $tipo = $usuario[1];

    if (isset($_GET["test"])) {
        echo "correcto";
    }

} catch (Exception $error) {
    http_response_code(401);
    echo "Token inválido.";
}

?>