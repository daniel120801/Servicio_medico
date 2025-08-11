<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

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
$con = new Conexion([
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
]);

// GET: Obtener conferencia
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['todo'])) {
        $select = $con->select('conferencia', "id, nombre, fecha, hora, presentador,descripcion");
        $conferencia = $select->execute();
        header("Content-Type: application/json");
        echo json_encode($conferencia);
        exit;
    } 

// ...existing code...

elseif (isset($_GET['accion']) && $_GET['accion'] === 'asistentesConferencia' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT COUNT(*) as total FROM conferenciasasistidas WHERE conferencia_id = ?";
    $stmt = $con->prepare($sql);
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'] ?? 0;
    header("Content-Type: application/json");
    echo json_encode(['total' => $total]); // <-- Cambia aquí
    exit;
}
// ...existing code...
    else {
        http_response_code(400);
        echo json_encode(['error' => 'Parámetros inválidos para GET']);
        exit;
    }
}

// POST: Insertar conferencia
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos JSON inválidos']);
        exit;
    }

    if (isset($data['accion']) && $data['accion'] === 'registrarConferencia') {
        if (!isset($data['nombre']) || !isset($data['fecha']) || !isset($data['hora']) || !isset($data['presentador']) ||
            !isset($data['descripcion']) ) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para registrar conferencia']);
            exit;
        }

        $insert = $con->insert('conferencia', "nombre, fecha, hora, presentador, descripcion");
        $insert->value($data['nombre']);
        $insert->value($data['fecha']);
        $insert->value($data['hora']);
        $insert->value($data['presentador']);
        $insert->value($data['descripcion']);
        $resultado = $insert->execute();

        echo json_encode(['resultado' => $resultado]);
        exit;
    }

    elseif (isset($data['accion']) && $data['accion'] === 'registrarAsistencia') {
        if (!isset($data['conferencia_id']) || !isset($data['matricula'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para registrar asistencia']);
            exit;
        }

        $insert = $con->insert('conferenciasasistidas', "conferencia_id, alumno_mtr");
        $insert->value($data['conferencia_id']);
        $insert->value($data['matricula']);
        $resultado = $insert->execute();

        echo json_encode(['resultado' => $resultado]);
        exit;

    }
    
    else {
        http_response_code(400);
        echo json_encode(['error' => 'Acción no reconocida']);
        exit;
    }
}


http_response_code(405); // Método no permitido
echo json_encode(['error' => 'Método no permitido']);
