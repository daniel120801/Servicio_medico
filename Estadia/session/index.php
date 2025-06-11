<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


header('Content-Type: application/json');

require "firebase-php-jwt/vendor/autoload.php";
use Firebase\JWT\JWT;
require_once '../conexion.php';
// Manejar preflight (opcional, pero recomendado)
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'preflight request handled'
    ]);
    exit();
}
if (!isset($_POST["username"]) || !isset($_POST["password"])) {

    http_response_code(400);
    echo json_encode([
        'status' => 'failed',
        'message' => 'Parametros faltantes',
        'valores recibidos' => $_POST,
    ]);
    exit;
}

$nombre_usuario = $_POST["username"];
$contrasena = $_POST["password"];


$con = new Conexion(array(
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
));

$select = $con->select("usuarios");
$select->where("nombre", "=", $nombre_usuario);
$select->where_and("pwd", "=", $contrasena);

$usuarios = $select->execute();


if (count($usuarios) > 0) {
    $usuario = $usuarios[0];



    $payload = [
        "iat" => time(),
        "exp" => time() + (60 * 10),
        "sub" => $usuario["id"]
    ];

    $jwt = JWT::encode($payload, "Estadia_2025", "HS256");

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'token' => $jwt
    ]);
} else {
    http_response_code(200);
    echo json_encode([
        'status' => 'failed',
        'message' => 'usuario no encontrado' 
    ]);
}

