/**
 * Token Utility Class
 *
 * Esta clase proporciona métodos para generar y verificar tokens JWT utilizando la librería Firebase PHP JWT.
 * Los tokens generados se almacenan en una cookie llamada 'access_token'.
 *
 * Métodos:
 * - generate($sub): string
 *   Genera un token JWT con el identificador de usuario proporcionado en el parámetro $sub.
 *   El token incluye los campos 'iat' (issued at), 'exp' (expiration, 24 horas después de la creación) y 'sub' (subject).
 *   El token se almacena en una cookie HttpOnly.
 *   Retorna el token JWT generado como string.
 *
 * - verifyCookieValid(): string
 *   Verifica si la cookie 'access_token' existe y es válida.
 *   Si la cookie no existe, retorna 'token no encontrado'.
 *   Si el token es válido, retorna 'decoded'.
 *   Si el token no es válido o ocurre un error, retorna el mensaje de la excepción.
 *
 * Uso:
 * - Utiliza la clave secreta definida en la propiedad privada $SECRET_KEY.
 * - Requiere la librería Firebase PHP JWT instalada y cargada mediante Composer.
 *
 * @package Estadia\Session
 */
<?php
require "firebase-php-jwt/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Token
{
    private static $SECRET_KEY = "Estadia_2025";

    static function generate( $sub): string
    {

        $payload = [
            "iat" => time(),
            "exp" => time() + (60 * 60 * 24),
            "sub" => $sub
        ];

        $jwt = JWT::encode($payload, self::$SECRET_KEY, "HS256");
        setcookie(
            name: 'access_token',          // Nombre
            value: $jwt,            // Valor
            path: '/',                      // Ruta
            domain: 'localhost',          // Dominio (ajusta si estás en localhost)
            secure: false,                     // Secure (requiere HTTPS)
            httponly: true                      // HttpOnly
        );
        return $jwt;
    }

    static function verifyCookieValid(): string
    {
        if (!isset($_COOKIE['access_token'])) {
            

            return 'token no encontrado';
        }

        try {
            $decoded = JWT::decode($_COOKIE['access_token'], new Key(self::$SECRET_KEY, 'HS256'));
            if ($decoded)
                return 'decoded';
            else
                return 'no decoded';
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

}


