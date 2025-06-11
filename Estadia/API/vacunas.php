<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$con = new Conexion([
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
]);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['all'])) {
        $select = $con->select('vacunas', "id, nombre, fecha");
        $vacunas = $select->execute();
        header("Content-Type: application/json");
        echo json_encode($vacunas);
        exit;
    } 
    elseif (isset($_GET['accion']) && $_GET['accion'] === 'alumnosVacunados' && isset($_GET['vacuna_id'])) {
        $vacuna_id = intval($_GET['vacuna_id']);
        $select = $con->select('alumnovacuna a JOIN alumnos al ON a.estudiante_id = al.id', 'al.nombre');
        $select->where('a.vacuna_id', '=', $vacuna_id);
        $result = $select->execute();
        $nombres = array_map(fn($row) => $row['nombre'], $result);
        header("Content-Type: application/json");
        echo json_encode($nombres);
        exit;
    }
    elseif (isset($_GET['accion']) && $_GET['accion'] === 'verificarVacunado' && isset($_GET['estudiante_id']) && isset($_GET['vacuna_id'])) {
        $estudiante_id = intval($_GET['estudiante_id']);
        $vacuna_id = intval($_GET['vacuna_id']);
        $select = $con->select('alumnovacuna', "COUNT(*) as total");
        $select->where('estudiante_id', '=', $estudiante_id);
        $select->where('vacuna_id', '=', $vacuna_id);
        $result = $select->execute();
        $yaVacunado = ($result && $result[0]['total'] > 0);
        header("Content-Type: application/json");
        echo json_encode($yaVacunado);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Parámetros inválidos para GET']);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos JSON inválidos']);
        exit;
    }

    if (isset($data['accion']) && $data['accion'] === 'registrarVacuna') {
        if (!isset($data['nombre']) || !isset($data['fecha'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para registrar vacuna']);
            exit;
        }

        $insert = $con->insert('vacunas', "nombre, fecha");
        $insert->value($data['nombre']);
        $insert->value($data['fecha']);
        $resultado = $insert->execute();

        echo json_encode(['resultado' => $resultado]);
        exit;

    } elseif (isset($data['accion']) && $data['accion'] === 'insertarConsulta') {
        if (!isset($data['nombre']) || !isset($data['fecha']) || !isset($data['diagnostico'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para insertar consulta']);
            exit;
        }

        $insert = $con->insert('consultas', "nombre, fecha, diagnostico");
        $insert->value($data['nombre']);
        $insert->value($data['fecha']);
        $insert->value($data['diagnostico']);
        $resultado = $insert->execute();

        echo json_encode(['resultado' => $resultado]);
        exit;


    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Acción no reconocida']);
        exit;
    }
}

http_response_code(405); // Método no permitido
echo json_encode(['error' => 'Método no permitido']);
