<?php
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
require "firebase-php-jwt/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class Token
{
    private static string $SECRET_KEY = "Estadia_2025";
    private static string $COOKIE_NAME = 'access_token';
    private static int $EXPIRATION = 3600; // 1 hora en segundos

    /**
     * Genera un token JWT y lo establece como cookie
     */
    public static function generate(string $subject): string
    {
        $payload = [
            "iat" => time(),
            "exp" => time() + self::$EXPIRATION,
            "sub" => $subject
        ];

        $jwt = JWT::encode($payload, self::$SECRET_KEY, "HS256");

        self::setTokenCookie($jwt);

        return $jwt;
    }

    /**
     * Verifica si el token en la cookie es válido
     */
    public static function verifyCookieValid(): array
    {
        if (!isset($_COOKIE[self::$COOKIE_NAME])) {
            return ['valid' => false, 'message' => 'Token no encontrado'];
        }

        try {
            $decoded = JWT::decode(
                $_COOKIE[self::$COOKIE_NAME],
                new Key(self::$SECRET_KEY, 'HS256')
            );

            return [
                'valid' => true,
                'data' => $decoded,
                'message' => 'Token válido'
            ];

        } catch (Exception $e) {
            self::deleteCookie(); // Eliminar cookie inválida
            return ['valid' => false, 'message' => $e->getMessage()];
        }
    }

    /**
     * Elimina la cookie del token
     */
    public static function deleteCookie(): bool
    {
        if (isset($_COOKIE[self::$COOKIE_NAME])) {
            unset($_COOKIE[self::$COOKIE_NAME]);
        }

        return setcookie(
            self::$COOKIE_NAME,
            '',
            time() - 3600,
            '/',
            'localhost',
            true,  // Secure
            true   // HttpOnly
        );
    }

    /**
     * Establece la cookie con el token
     */
    private static function setTokenCookie(string $token): bool
    {
        return setcookie(
            self::$COOKIE_NAME,
            $token,
            time() + self::$EXPIRATION,
            '/',
            'localhost',
            false,  // Secure (cambiar a true en producción con HTTPS)
            true    // HttpOnly
        );
    }

    /**
     * Obtiene el subject (sub) del token decodificado
     */
    public static function getSubject(): ?string
    {
        $verification = self::verifyCookieValid();

        if ($verification['valid']) {
            return $verification['data']->sub ?? null;
        }

        return null;
    }
}


