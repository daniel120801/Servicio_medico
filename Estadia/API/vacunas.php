<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(204);
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
    } 
    else if (isset($_GET["registrar"])) {
        $insert = $con->insert('vacunas', "nombre, fecha");
        $insert->value($nombre);
        $insert->value($fecha);
        $registrar = $insert->execute();
        
        echo ($registrar);
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
        $select->where('estudiante_id', '=', $estudiante_id);
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
        echo json_encode(['error' => 'Método no permitido']);
        exit;
    }
}
else {
        http_response_code(400);
        echo json_encode(['error' => 'esta mal el metodo']);
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

        $insert = $con->insert('alumnovacuna', "estudiante_id, vacuna_id");
        $insert->value($data['estudiante_id']);
        $insert->value($data['vacuna_id']);
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
