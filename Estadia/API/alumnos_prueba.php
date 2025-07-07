<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST,OPTIONS");
header('Content-Type: application/json');

require_once '../conexion.php';

$limit_rows = 15;

$con = new Conexion(array(
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
));

/*
SELECT 
    a.matricula,
    a.nombre,
    a.carrera,
    total.total_count - 10 AS filas_restantes
FROM alumnos a
CROSS JOIN (SELECT COUNT(*) AS total_count FROM alumnos) AS total
ORDER BY a.matricula
LIMIT 10;
*/

$pag = $_GET['pag'];

$select = $con->select("alumnos a", " a.matricula,a.nombre,a.carrera, total.total_count  AS filas ");
$select->crossjoin("(SELECT COUNT(*) AS total_count FROM alumnos) AS total");
$select->limit(" $limit_rows OFFSET $pag");
//echo $select->getQuery();
echo json_encode($select->execute());

// fields:
//   @param: field = 'n','mtr','c'
//   @param: value = valor a buscar
//   @param: pag = número de página para paginación

if (isset($_GET['search'])) {
    $isValidREquest = isset($_POST['field']) && isset($_POST['value']) && isset($_POST['pag']);

    if (!$isValidREquest) {
        echo json_encode([
            'status' => 'failed',
            'message' => 'parametros faltantes',
            'data' => null
        ]);
        exit;
    }

    $field = $_POST['field'];
    $value = $_POST['value'];
    $pag = $_POST['pag'];

    $select = $con->select("alumnos", "matricula,nombre,matricula,carrera");
    $select->limit("20 OFFSET $pag");
    switch ($field) {
        case 'n':
            $select->where("nombre", "LIKE", "%$value%");
            break;
        case 'mtr':
            $select->where("matricula", "LIKE", "%$value%");
            break;
        case 'c':
            $select->where("carrera", "LIKE", "%$value%");
            break;

        default:
            echo json_encode([
                'status' => 'failed',
                'message' => 'campo de busqueda invalido',
                'data' => null
            ]);
            exit;
    }
    $res = $select->execute();
    echo json_encode([
        'status' => 'success',
        'message' => '',
        'data' => $res
    ]);

}