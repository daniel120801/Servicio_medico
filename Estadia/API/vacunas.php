<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


file_put_contents('php://stderr', print_r([
    'method' => $_SERVER['REQUEST_METHOD'],
    'get' => $_GET,
    'post' => $_POST,
    'input' => file_get_contents("php://input")
], true));


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
    } elseif (isset($_GET['all_consulta'])) {
        $select = $con->select('consultas', "id, nombre, fecha, diagnostico");
        $consultas = $select->execute();
        header("Content-Type: application/json");
        echo json_encode($consultas);
        exit;
    }
    elseif (isset($_GET['accion']) && $_GET['accion'] === 'alumnosVacunados' && isset($_GET['vacuna_id'])) {
        $vacuna_id = intval($_GET['vacuna_id']);
        $select = $con->select('alumnovacuna a JOIN alumnos al ON a.alumno_mtr = al.matricula', 'al.nombre');
        $select->where('a.vacuna_id', '=', $vacuna_id);
        $result = $select->execute();
        $nombres = array_map(fn($row) => $row['nombre'], $result);
        header("Content-Type: application/json");
        echo json_encode($nombres);
        exit;
    }
// ...existing code...
elseif (
    isset($_GET['accion']) && 
    $_GET['accion'] === 'verificarVacunado' && 
    isset($_GET['estudiante_id']) && 
    isset($_GET['vacuna_id'])
) {
    try {
        $estudiante_id = intval($_GET['estudiante_id']);
        $vacuna_id = intval($_GET['vacuna_id']);

        $select = $con->select('alumnovacuna', "COUNT(*) as total");
        $select->where('alumno_mtr', '=', $estudiante_id);
        $select->where_and('vacuna_id', '=', $vacuna_id); // <-- CAMBIO AQUÍ
        $result = $select->execute();

        if (!$result || !isset($result[0]['total'])) {
            throw new Exception("Resultado inesperado en la consulta");
        }

        $yaVacunado = ($result[0]['total'] > 0);
        header("Content-Type: application/json");
        echo json_encode($yaVacunado);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Error al verificar vacunación: ' . $e->getMessage()
        ]);
    }
    exit;
}
// ...existing code...
 else {
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

    } elseif (isset($data['accion']) && $data['accion'] === 'registrarVacunaAlumno') {
        if (!isset($data['estudiante_id']) || !isset($data['vacuna_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para registrar vacunación']);
            exit;
        }

        $insert = $con->insert('alumnovacuna', "alumno_mtr, vacuna_id");
        $insert->value($data['estudiante_id']);
        $insert->value($data['vacuna_id']);
        $resultado = $insert->execute();

        echo json_encode(['resultado' => $resultado]);
        exit;

    }else {
        http_response_code(400);
        echo json_encode(['error' => 'Acción no reconocida']);
        exit;
    }

    
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        isset($data['accion']) && $data['accion'] === 'eliminarVacunaAlumno' &&
        isset($data['estudiante_id']) && isset($data['vacuna_id'])
    ) {
        $delete = $con->delete('alumnovacuna');
        $delete->where('alumno_mtr', '=', $data['estudiante_id']);
        $delete->where_and('vacuna_id', '=', $data['vacuna_id']);
        $resultado = $delete->execute();

        echo json_encode(['resultado' => $resultado]);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Parámetros inválidos para eliminar vacunación']);
        exit;
    }
}

http_response_code(405); // Método no permitido
echo json_encode(['error' => 'Método no permitido']);
