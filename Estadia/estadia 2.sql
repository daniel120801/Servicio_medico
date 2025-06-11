-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para estadia
CREATE DATABASE IF NOT EXISTS `estadia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `estadia`;

-- Volcando estructura para vista estadia.all_alumno
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `all_alumno` (
	`nombre` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci',
	`matricula` INT(9) NOT NULL,
	`telefono` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`correo` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`carrera` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`CURP` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`ciudad` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`domicilio` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`edad` INT(11) NULL,
	`NSS` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`afiliacion` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`RH` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`donador` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`peso` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`talla` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`alergias` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`enfermedades` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`tratamientos` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`discapacidad` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`enCasoDeAccidente` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`vacunas_json` MEDIUMTEXT NULL COLLATE 'utf8mb4_general_ci',
	`conferencias_json` MEDIUMTEXT NULL COLLATE 'utf8mb4_general_ci',
	`documento_json` MEDIUMTEXT NULL COLLATE 'utf8mb4_general_ci'
);

-- Volcando estructura para tabla estadia.alumnos
CREATE TABLE IF NOT EXISTS `alumnos` (
  `nombre` varchar(255) NOT NULL,
  `matricula` int(9) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `carrera` varchar(100) DEFAULT NULL,
  `CURP` varchar(20) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `domicilio` text DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `NSS` varchar(20) DEFAULT NULL,
  `afiliacion` varchar(100) DEFAULT NULL,
  `RH` varchar(5) DEFAULT NULL,
  `donador` varchar(10) DEFAULT NULL,
  `peso` varchar(10) DEFAULT NULL,
  `talla` varchar(10) DEFAULT NULL,
  `alergias` text DEFAULT NULL,
  `enfermedades` text DEFAULT NULL,
  `tratamientos` text DEFAULT NULL,
  `discapacidad` text DEFAULT NULL,
  `enCasoDeAccidente` text DEFAULT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.alumnos: ~2 rows (aproximadamente)
INSERT INTO `alumnos` (`nombre`, `matricula`, `telefono`, `correo`, `carrera`, `CURP`, `ciudad`, `domicilio`, `edad`, `NSS`, `afiliacion`, `RH`, `donador`, `peso`, `talla`, `alergias`, `enfermedades`, `tratamientos`, `discapacidad`, `enCasoDeAccidente`) VALUES
	('Juan Pérez', 23005012, '555-123-4567', 'juan.perez@example.com', 'Ingeniería en Sistemas', 'PEPJ900101HDFRRN09', 'Ciudad de México', 'Av. Reforma #123', 25, '12345678901', 'IMSS', 'O+', 'Sí', '70kg', '1.75m', 'Ninguna', 'Asma', 'Inhaladores', 'Ninguna', 'Llamar a María Pérez 555-765-4321'),
	('Ana López', 23005048, '555-987-6543', 'ana.lopez@example.com', 'Medicina', 'LOPA980202MDFRZN07', 'Guadalajara', 'Calle Juárez #456', 22, '98765432109', 'ISSSTE', 'A-', 'No', '60kg', '1.65m', 'Penicilina', 'Ninguna', 'Ninguno', 'Auditiva', 'Llamar a José López 555-321-7654');

-- Volcando estructura para tabla estadia.alumnovacuna
CREATE TABLE IF NOT EXISTS `alumnovacuna` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vacuna_id` int(11) NOT NULL,
  `alumno_mtr` int(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `constraint_vacunas` (`vacuna_id`),
  KEY `alumno_mtr` (`alumno_mtr`),
  CONSTRAINT `alumnovacuna_ibfk_1` FOREIGN KEY (`alumno_mtr`) REFERENCES `alumnos` (`matricula`),
  CONSTRAINT `constraint_vacunas` FOREIGN KEY (`vacuna_id`) REFERENCES `vacunas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.alumnovacuna: ~2 rows (aproximadamente)
INSERT INTO `alumnovacuna` (`id`, `vacuna_id`, `alumno_mtr`) VALUES
	(1, 1, 23005048),
	(2, 2, 23005012);

-- Volcando estructura para tabla estadia.conferencia
CREATE TABLE IF NOT EXISTS `conferencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `descripcion` text DEFAULT NULL,
  `presentador` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.conferencia: ~0 rows (aproximadamente)
INSERT INTO `conferencia` (`id`, `nombre`, `fecha`, `hora`, `descripcion`, `presentador`) VALUES
	(1, 'Salud mental', '2025-06-02', '10:22:35', 'tania necesita', 'Tania');

-- Volcando estructura para tabla estadia.conferenciasasistidas
CREATE TABLE IF NOT EXISTS `conferenciasasistidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conferencia_id` int(11) DEFAULT NULL,
  `alumno_mtr` int(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `conferencia_id` (`conferencia_id`),
  KEY `alumno_mtr` (`alumno_mtr`),
  CONSTRAINT `conferenciasasistidas_ibfk_1` FOREIGN KEY (`alumno_mtr`) REFERENCES `alumnos` (`matricula`),
  CONSTRAINT `conferenciasasistidas_ibfk_2` FOREIGN KEY (`conferencia_id`) REFERENCES `conferencia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.conferenciasasistidas: ~0 rows (aproximadamente)
INSERT INTO `conferenciasasistidas` (`id`, `conferencia_id`, `alumno_mtr`) VALUES
	(1, 1, 23005048);

-- Volcando estructura para tabla estadia.consultas
CREATE TABLE IF NOT EXISTS `consultas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `fecha` date NOT NULL,
  `diagnostico` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.consultas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estadia.documento
CREATE TABLE IF NOT EXISTS `documento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `alumno_mtr` int(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `documento_ibfk_2` (`alumno_mtr`),
  CONSTRAINT `documento_ibfk_2` FOREIGN KEY (`alumno_mtr`) REFERENCES `alumnos` (`matricula`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.documento: ~0 rows (aproximadamente)
INSERT INTO `documento` (`id`, `nombre`, `alumno_mtr`) VALUES
	(1, 'Estadias Servicio medico.pdf', 23005048);

-- Volcando estructura para tabla estadia.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `nombre` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pwd` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.usuarios: ~0 rows (aproximadamente)
INSERT INTO `usuarios` (`nombre`, `id`, `pwd`) VALUES
	('Admin', 1, '12345');

-- Volcando estructura para tabla estadia.vacunas
CREATE TABLE IF NOT EXISTS `vacunas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.vacunas: ~4 rows (aproximadamente)
INSERT INTO `vacunas` (`id`, `nombre`, `fecha`) VALUES
	(1, 'alguna', '2025-06-02'),
	(2, 'covid', '2025-06-04'),
	(3, 'influenza', '2025-06-05'),
	(4, 'sarampion', '2025-06-06');

-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `all_alumno`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `all_alumno` AS SELECT 
        `a`.`nombre` AS `nombre`,
        `a`.`matricula` AS `matricula`,
        `a`.`telefono` AS `telefono`,
        `a`.`correo` AS `correo`,
        `a`.`carrera` AS `carrera`,
        `a`.`CURP` AS `CURP`,
        `a`.`ciudad` AS `ciudad`,
        `a`.`domicilio` AS `domicilio`,
        `a`.`edad` AS `edad`,
        `a`.`NSS` AS `NSS`,
        `a`.`afiliacion` AS `afiliacion`,
        `a`.`RH` AS `RH`,
        `a`.`donador` AS `donador`,
        `a`.`peso` AS `peso`,
        `a`.`talla` AS `talla`,
        `a`.`alergias` AS `alergias`,
        `a`.`enfermedades` AS `enfermedades`,
        `a`.`tratamientos` AS `tratamientos`,
        `a`.`discapacidad` AS `discapacidad`,
        `a`.`enCasoDeAccidente` AS `enCasoDeAccidente`,
        CONCAT('[',
                GROUP_CONCAT(DISTINCT CONCAT('{"id":',
                            `v`.`id`,
                            ',"nombre":"',
                            `v`.`nombre`,
                            '","fecha":"',
                            IFNULL(DATE_FORMAT(`v`.`fecha`, '%Y-%m-%d'), ''),
                            '"}')
                    SEPARATOR ','),
                ']') AS `vacunas_json`,
        CONCAT('[',
                GROUP_CONCAT(DISTINCT CONCAT('{"id":',
                            `c`.`id`,
                            ',"nombre":"',
                            `c`.`nombre`,
                            '","fecha":"',
                            `c`.`fecha`,
                            '","hora":"',
                            `c`.`hora`,
                            '","descripcion":"',
                            `c`.`descripcion`,
                            '","presentador":"',
                            `c`.`presentador`,
                            '"}')
                    SEPARATOR ','),
                ']') AS `conferencias_json`,
        CONCAT('[',
                GROUP_CONCAT(DISTINCT CONCAT('{"id":',
                            `d`.`id`,
                            ',"nombre":"',
                            `d`.`nombre`,
                            '"}')
                    SEPARATOR ','),
                ']') AS `documento_json`
    FROM
        (((((`estadia`.`alumnos` `a`
        LEFT JOIN `estadia`.`alumnovacuna` `av` ON (`a`.`matricula` = `av`.`alumno_mtr`))
        LEFT JOIN `estadia`.`vacunas` `v` ON (`av`.`vacuna_id` = `v`.`id`))
        LEFT JOIN `estadia`.`conferenciasasistidas` `ca` ON (`a`.`matricula` = `ca`.`alumno_mtr`))
        LEFT JOIN `estadia`.`conferencia` `c` ON (`ca`.`conferencia_id` = `c`.`id`))
        LEFT JOIN `estadia`.`documento` `d` ON (`a`.`matricula` = `d`.`alumno_mtr`))
    GROUP BY `a`.`matricula` 
;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
