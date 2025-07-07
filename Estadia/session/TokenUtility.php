<?php
require "firebase-php-jwt/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Token
{
    private static $SECRET_KEY = "Estadia_2025";

    static function generate($payload, $sub): string
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


