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

    if (isset($_GET['allheaders'])) {
        $select = $con->select("alumnos", "id,nombre,matricula,carrera");
        header("Content-Type: application/json");
        $alumno = $select->execute();
        echo json_encode($alumno);
        exit;
    }   


    else if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        if($id <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'ID del alumno no válido']);
            exit;
        }
        $select = $con->select("all_alumno ");
        $select->where("id", "=", $id);

        $alumno = $select->execute();
        if ($alumno && count($alumno) > 0) {
            $alumno = $alumno[0];
        } else {
            $alumno = null;
        }
        try {
            $alumno['vacunas'] = $alumno['vacunas_json'] ? json_decode('[' . $alumno['vacunas_json'] . ']', true) : [];


        } catch (Exception $e) {
       
            $alumno['vacunas'] = [];
        }
        try {
          $alumno['conferencias'] = $alumno['conferencias_json'] ? json_decode('[' . $alumno['conferencias_json'] . ']', true) : [];
        } catch (Exception $e) {
            $alumno['conferencias'] = [];
        }

        // Eliminar campos JSON crudos (opcional)
        unset($alumno['vacunas_json'], $alumno['22'], $alumno['21'], $alumno['conferencias_json']);

        // Mostrar resultados (o enviar como API)
        header('Content-Type: application/json');
        echo json_encode($alumno, JSON_PRETTY_PRINT);
        exit;
    }


} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
