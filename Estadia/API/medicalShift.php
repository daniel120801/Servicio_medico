<?php


header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST,OPTIONS");
header('Content-Type: application/json');
require_once '../conexion.php';
require_once '../session/TokenUtility.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(204);
    exit;
}
$resultVerifyToken = Token::verifyCookieValid();
if (!$resultVerifyToken['valid']) {
    http_response_code(401);
    echo json_encode([
        'status' => 'failed',
        'message' => $resultVerifyToken,
        'data' => null
    ]);
    exit;
}

$directory = '../jornadas_medicas';

$con = new Conexion(array(
    "tipo" => "mysql",
    "servidor" => "127.0.0.1",
    "bd" => "estadia",
    "usuario" => "root",
    "contrasena" => ""
));
if (isset($_GET['allheaders'])) {
    $select = $con->select("jornadamedica");
    $result = $select->execute();

    if (count($result) <= 0) {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'data' => [],
            'message' => 'No hay registros'
        ]);
        exit;
    }
    foreach ($result as $key => $value) {
        $folderPath = $directory . '/' . $value['access_code'];
        $count = 0;
        if (
            file_exists($directory) &&
            file_exists($folderPath)
        ) {
            // Contar solo archivos .txt en la carpeta
            $files = array_filter(scandir($folderPath), function ($file) use ($folderPath) {
                return is_file($folderPath . '/' . $file) && pathinfo($file, PATHINFO_EXTENSION) === 'json';
            });
            $count = count($files);
        }
        // Añadir la cantidad de archivos al array value
        $result[$key]['filesCount'] = $count;

    }

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'data' => $result,
    ]);



} elseif (isset($_GET['create'])) {

    if (!isset($_POST['name']) && !isset($_POST['date'])) {
        http_response_code(402);
        echo json_encode(['status' => 'failed', 'message' => 'campos faltantes']);
        exit;
    }
    $name = $_POST['name'];
    $accessCode = generateAccessCode();
    $date = $_POST['date'];
    $insert = $con->insert("jornadamedica", "name,access_code,date");
    $insert->value($name);
    $insert->value($accessCode);
    $insert->value($date);
    $result = $insert->execute();

    if ($result > 0) {

        //se selecciona el ultimo elemento agregado

        $select = $con->select("jornadamedica");
        $select->where("access_code", "=", $accessCode);
        $resSel = $select->execute();
        if (count($resSel) > 0) {
            $resSel[0]['filesCount'] = 0;

            http_response_code(200);
            echo json_encode([
                'status' => 'success',
                'message' => 'Se ha creado la jornada de medicina',
                'data' => $resSel[0]
            ]);
            exit;
        }
    }
    http_response_code(403);
    echo json_encode([
        'status' => 'failed',
        'message' => 'No se ha creado la jornada de medicina',
        'data' => null
    ]);



} elseif (isset($_GET['getForm'])) {
    if (!isset($_GET['access_code']) || !isset($_GET['nameFile'])) {
        http_response_code(402);
        echo json_encode(['status' => 'failed', 'message' => 'campos faltantes']);
        exit;
    }
} elseif (isset($_GET['forms'])) {

    if (!isset($_GET['access_code'])) {
        http_response_code(402);
        echo json_encode(['status' => 'failed', 'message' => 'campos faltantes']);
        exit;
    }
    $folderPath = $directory . '/' . $_GET['access_code'];
    if (!file_exists($directory) || !file_exists($folderPath)) {
        http_response_code(402);
        echo json_encode(['status' => 'failed', 'message' => 'sin archivos']);
        exit;
    }
    //obtener los archivos json

    $allFiles = array_filter(scandir($folderPath), function ($file) use ($folderPath) {
        return is_file($folderPath . '/' . $file) && pathinfo($file, PATHINFO_EXTENSION) === 'json';
    });
    $allFiles = array_diff(
        $allFiles,
        array('.', '..')
    );
    //leer archivos json y crear un array donde se guarde un diccionario de "nombre doc" con el contenido del json en formato array
    $jsons = [];
    foreach ($allFiles as $key => $value) {
        $jsons[] = json_decode(file_get_contents($folderPath . '/' . $value), true);

    }

    echo json_encode($jsons);




} elseif (isset($_GET['saveForm'])) {
    // Guardar registro de formulario en carpeta por access_code
    $input = $_POST;
    if (!isset($input['access_code'])) {
        http_response_code(400);
        echo json_encode(['status' => 'failed', 'message' => 'access_code faltante']);
        exit;
    }
    $folderPath = $directory . '/' . $input['access_code'];
    if (!is_dir($folderPath)) {
        mkdir($folderPath, 0777, true);
    }
    $filename = $folderPath . '/registro_' . date('Ymd_His') . '.json';
    $contenido = json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents($filename, $contenido) !== false) {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Registro guardado', 'file' => basename($filename)]);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'failed', 'message' => 'No se pudo guardar el archivo']);
    }
}
else {
    http_response_code(403);
    echo json_encode(['error' => 'solicitud no encontrada']);
}




function generateAccessCode($longitud = 20)
{
    $todosCaracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $mezclados = str_shuffle($todosCaracteres);
    return substr($mezclados, 0, $longitud);
}
