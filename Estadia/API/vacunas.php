<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require_once '../conexion.php';
require_once '../session/TokenUtility.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!Token::verifyCookieValid()) {

    http_response_code(401);
    echo json_encode(['error' => 'token invalido']);
    exit;
}

$con = new Conexion(array(
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
));



if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['all'])) {
        $select = $con->select("vacunas", "id,nombre,fecha");

        header("Content-Type: application/json");
        $vacunas = $select->execute();
        echo json_encode($vacunas);
        exit;
    } else if (isset($_GET["registrar"])) {
        $insert = $con->insert('vacunas', "nombre, fecha");
        $insert->value($nombre);
        $insert->value($fecha);
        $registrar = $insert->execute();

        echo ($registrar);
        exit;
    } else if (isset($_GET["insertar"])) {
        $insert = $con->insert('consultas', "nombre, fecha, diagnostico");
        $insert->value($nombre);
        $insert->value($fecha);
        $insert->value($diagnostico);
        $consultas = $insert->execute();

        echo ($consultas);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Método no permitido']);
        exit;
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'esta mal el metodo']);
    exit;
}





