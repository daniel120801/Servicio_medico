<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Allow: GET, POST, OPTIONS");
require "firebase-php-jwt/vendor/autoload.php";

use Firebase\JWT\JWT;

var_dump($_POST);

return;

$nombre_usuario = $_POST["usuario"];
$contrasena = $_POST["contrasena"];

$select = $con->select("usuarios");
$select->where("Nombre_Usuario", "=", $nombre_usuario);
$select->where_and("Contrasena", "=", $contrasena);

$usuarios = $select->execute();

if (count($usuarios)) {
    $usuario = $usuarios[0];

    $token_tipo = $usuario["Token_Tipo"];
    $token_stat = $usuario["Token_STAT"];

    if ($token_tipo == "c" && $token_stat == 1) {
        echo "Revisa tu correo para poder iniciar sesión.";
        exit;
    }

    $payload = [
        "iat" => time(),
        "exp" => time() + (60 * 3),
        "sub" => $usuario["Id_Usuario"] . "/" . $usuario["Tipo_Usuario"]
    ];

    $jwt = JWT::encode($payload, "Test12345", "HS256");
    echo "correcto";
    echo $jwt;
}

