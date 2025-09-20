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
	`genero` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
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
  `genero` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.alumnos: ~23 rows (aproximadamente)
INSERT INTO `alumnos` (`nombre`, `matricula`, `telefono`, `correo`, `carrera`, `CURP`, `ciudad`, `domicilio`, `edad`, `NSS`, `afiliacion`, `RH`, `donador`, `peso`, `talla`, `alergias`, `enfermedades`, `tratamientos`, `discapacidad`, `enCasoDeAccidente`, `genero`) VALUES
	('Luis Martínez', 20230003, '555-234-5678', 'luis.martinez@example.com', 'TIADSM', 'MALU920303HDFRRN01', 'Monterrey', 'Calle 5 de Mayo #789', 23, '123456789', 'IMSS', 'B+', 'No', '75kg', '1.80m', 'Ninguna', 'Diabetes', 'Insulina', 'Ninguna', 'Llamar a Pedro Martínez 555-345-6789', 'H'),
	('María Hernández', 20230004, '555-876-5432', 'maria.hernandez@example.com', 'TIADSM', 'HEMA950404MDFRNL05', 'Puebla', 'Av. Juárez #321', 24, '12344', 'IMSS', 'O-', 'No', '65kg', '1.60m', 'Polen', 'Ninguna', 'Ninguno', 'Visuala', 'Llamar a Juan Hernández 555-456-7890a', 'H'),
	('Carlos Ramírez', 20230005, '555-345-6789', 'carlos.ramirez@example.com', 'TIADSM', 'RACR910505HDFRRN02', 'Querétaro', 'Calle Hidalgo #101', 26, '222222222223', 'IMSSa', 'O-', 'No', '80kg', '1.85m', 'Ninguna', 'Hipertensión', 'Antihipertensivos', 'Motora', 'Llamar a Laura Ramírez 555-567-8901', 'H'),
	('Sofía Torres', 20230006, '555-654-3210', 'sofia.torres@example.com', 'TIADSM', 'TOSO960606MDFRZN06', 'Toluca', 'Calle Morelos #202', 21, '12345', 'IMSS', 'A-', 'SI', '12kg', '1.58m', 'Cacahuate', 'Ninguna', 'Asma', 'Auditiva', 'Llamar a Pedritoa', 'M'),
	('Daniel Gómez', 20230007, '555-432-1098', 'daniel.gomez@example.com', 'TIADSM', 'GODA870707HDFRRN03', 'León', 'Calle Independencia #303', 27, '222222222223', 'IMSS', 'B-', 'No', '90kg', '1.90m', 'Ninguna', 'Asma', 'Inhaladores', 'Ninguna', 'Llamar a Rosa Gómez 555-789-0123', 'H'),
	('Laura Díaz', 20230008, '555-210-9876', 'laura.diaz@example.com', 'TIADSM', 'DILA990808MDFRZN08', 'Tijuana', 'Calle Reforma #404', 22, '222222222223', 'ISSSTE', 'O+', 'No', '60kg', '1.70m', 'Ninguna', 'Epilepsia', 'Anticonvulsivo', 'Ningunaa', 'Llamar a Jorge Díaz 555-890-1234', 'H'),
	('Pedro Sánchez', 20230009, '555-109-8765', 'pedro.sanchez@example.com', 'TIADSM', 'SAPC880909HDFRRN04', 'Mérida', 'Calle Itzáes #505', 24, '222222222223', 'IMSS', 'AB-', 'No', '85kg', '1.75m', 'Mariscos', 'Ninguna', 'Ninguno', 'Ninguna', 'Llamar a Carla Sánchez 555-901-2345', 'H'),
	('Lucía Castro', 20230010, '555-098-7654', 'lucia.castro@example.com', 'TIADSM', 'CALU970101MDFRZN09', 'Chihuahua', 'Av. Universidad #606', 23, '222222222223', 'ISSSTE', 'A-', 'No', '58kg', '1.65m', 'Polvo', 'Ninguna', 'Ninguno', 'Visual', 'Llamar a Héctor Castro 555-012-3456', 'H'),
	('Miguel Vargas', 20230011, '555-987-6540', 'miguel.vargas@example.com', 'TIADSM', 'VAMH900202HDFRRN05', 'Morelia', 'Calle Madero #707', 25, '222222222223', 'IMSS', 'B+', 'No', '78kg', '1.82m', 'Lácteos', 'Ninguna', 'Ninguno', 'Motora', 'Llamar a Sonia Vargas 555-123-4560', 'H'),
	('Elena Navarro', 20230012, '555-876-5431', 'elena.navarro@example.com', 'TIADSM', 'NAEL950303MDFRZN07', 'Saltillo', 'Calle Hidalgo #808', 22, '222222222223', 'ISSSTE', 'O-', 'No', '50kg', '1.60m', 'Ninguna', 'Gastritis', 'Dieta especial', 'Ninguna', 'Llamar a Raúl Navarro 555-234-5671', 'H'),
	('Jorge Méndez', 20230013, '555-765-4320', 'jorge.mendez@example.com', 'MAI', 'MEJO930404HDFRRN06', 'Tampico', 'Calle Principal #909', 24, '222222222223', 'IMSS', 'AB+', 'No', '72kg', '1.78m', 'Aspirina', 'Ninguna', 'Ninguno', 'Ninguna', 'Llamar a Paula Méndez 555-345-6782', 'H'),
	('Camila Reyes', 20230014, '555-654-3219', 'camila.reyes@example.com', 'MAI', 'RECA990505MDFRZN06', 'Aguascalientes', 'Calle Central #010', 21, '222222222223', 'ISSSTE', 'B-', 'No', '59kg', '1.68m', 'Ninguna', 'Ninguna', 'Ninguno', 'Auditiva', 'Llamar a Iván Reyes 555-456-7893', 'H'),
	('Andrés Flores', 20230015, '555-543-2108', 'andres.flores@example.com', 'MAI', 'FLAN910606HDFRRN07', 'Culiacán', 'Av. Insurgentes #111', 23, '222222222223', 'IMSS', 'A+', 'No', '82kg', '1.80m', 'Ninguna', 'Asma', 'Inhaladores', 'Ninguna', 'Llamar a Teresa Flores 555-567-8904', 'H'),
	('Valeria Ríos', 20230016, '555-432-1097', 'valeria.rios@example.com', 'MAI', 'RIVA980707MDFRZN05', 'San Luis Potosí', 'Calle Real #212', 22, '222222222223', 'ISSSTE', 'O+', 'No', '62kg', '1.70m', 'Gluten', 'Ninguna', 'Dieta sin gluten', 'Ninguna', 'Llamar a Diego Ríos 555-678-9015', 'H'),
	('Ricardo Cruz', 20230017, '555-321-0986', 'ricardo.cruz@example.com', 'MAI', 'CURI920808HDFRRN08', 'Oaxaca', 'Calle Libertad #313', 26, '222222222223', 'IMSS', 'B+', 'No', '68kg', '1.75m', 'Ninguna', 'Ninguna', 'Ninguno', 'Visual', 'Llamar a Erika Cruz 555-789-0126', 'H'),
	('Fernanda Morales', 20230018, '555-210-9875', 'fernanda.morales@example.com', 'MAI', 'MOFE970909MDFRZN03', 'Tuxtla', 'Calle Reforma #414', 23, '222222222223', 'ISSSTE', 'AB-', 'No', '54kg', '1.60m', 'Penicilina', 'Alergias respiratorias', 'Antihistamínicos', 'Auditiva', 'Llamar a Tomás Morales 555-890-1237', 'H'),
	('Héctor Silva', 20230019, '555-109-8764', 'hector.silva@example.com', 'MAI', 'SIHE890101HDFRRN09', 'Durango', 'Av. Principal #515', 25, '222222222223', 'IMSS', 'O-', 'No', '85kg', '1.85m', 'Ninguna', 'Hipertensión', 'Antihipertensivos', 'Ninguna', 'Llamar a Clara Silva 555-901-2348', 'H'),
	('Isabel Romero', 20230020, '555-098-7653', 'isabel.romero@example.com', 'MAI', 'ROIS960202MDFRZN04', 'Colima', 'Calle 16 de Septiembre #616', 24, '222222222223a', 'ISSSTE', 'A-', 'No', '61kg', '1.68m', 'Mariscos', 'Ninguna', 'Ninguno', 'Motora', 'Llamar a Fabián Romero 555-012-3459', 'H'),
	('Álvaro Castañeda', 20230021, '555-987-6542', 'alvaro.castaneda@example.com', 'MAI', 'CAAL930303HDFRRN06', 'Zacatecas', 'Calle Zaragoza #717', 22, '222222222223', 'IMSS', 'B-', 'No', '73kg', '1.78m', 'Polvo', 'Rinitis alérgica', 'Antihistamínicos', 'Ninguna', 'Llamar a Norma Castañeda 555-123-4562', 'H'),
	('Natalia Herrera', 20230022, '555-876-5430', 'natalia.herrera@example.com', 'MAI', 'HENA950404MDFRZN08', 'La Paz', 'Av. Revolución #818', 23, '222222222223', 'ISSSTE', 'AB+', 'No', '56kg', '1.60m', 'Lácteos', 'Ninguna', 'Ninguno', 'Auditiva', 'Llamar a Emilio Herrera 555-234-5673', 'H'),
	('Juan Pérez', 23005012, '555-123-4567', 'juan.perez@example.com', 'TIADSM', 'PEPJ900101HDFRRN09', 'Ciudad de México', 'Av. Reforma #123', 25, '222222222223', 'IMSS', 'O+', 'No', '70kg', '1.75m', 'Ninguna', 'Asma', 'Inhaladores', 'Ninguna', 'Llamar a María Pérez 555-765-4321', 'H'),
	('Ana López', 23005048, '555-987-6543', 'ana.lopez@example.com', 'MAI', 'LOPA980202MDFRZN07', 'Guadalajara', 'Calle Juárez #456', 22, '222222222223', 'ISSSTE', 'A-', 'No', '60kg', '1.65m', 'Penicilina', 'Ninguna', 'Ningunoa', 'Auditiva', 'Llamar a José López 555-321-7654', 'H'),
	('Tania Torres', 23005102, '8781239277', 'angeltorrest@gmail.com', 'TIADSM', 'TOTT060928MCLRRNA9', 'Piedras negras', 'Nuevo leon #206', 18, '234567834567', 'IMSS', 'O-', 'No', '57kg', '1.60m', NULL, NULL, NULL, NULL, 'Llamar a Carmen 878-114-3744', 'F');

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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.alumnovacuna: ~15 rows (aproximadamente)
INSERT INTO `alumnovacuna` (`id`, `vacuna_id`, `alumno_mtr`) VALUES
	(2, 2, 23005012),
	(4, 2, 20230015),
	(5, 2, 20230017),
	(6, 2, 20230011),
	(7, 2, 23005048),
	(8, 2, 20230022),
	(9, 2, 20230021),
	(10, 2, 20230020),
	(11, 2, 20230019),
	(12, 2, 20230018),
	(14, 1, 20230021),
	(16, 1, 20230008),
	(17, 1, 20230014),
	(18, 1, 20230016),
	(33, 1, 20230005);

-- Volcando estructura para tabla estadia.conferencia
CREATE TABLE IF NOT EXISTS `conferencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `descripcion` text DEFAULT NULL,
  `presentador` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.conferencia: ~3 rows (aproximadamente)
INSERT INTO `conferencia` (`id`, `nombre`, `fecha`, `hora`, `descripcion`, `presentador`) VALUES
	(1, 'Salud mental', '2025-06-02', '10:22:35', 'tania necesita', 'Tania'),
	(2, 'Selena', '2025-06-28', '12:25:00', 'test.', 'Tania'),
	(3, 'ASDFGH', '2025-08-14', '02:47:00', 'asdfg', 'tANIA');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.conferenciasasistidas: ~3 rows (aproximadamente)
INSERT INTO `conferenciasasistidas` (`id`, `conferencia_id`, `alumno_mtr`) VALUES
	(1, 1, 23005048),
	(2, 1, 20230003),
	(3, 3, 20230003);

-- Volcando estructura para tabla estadia.consultas
CREATE TABLE IF NOT EXISTS `consultas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `fecha` date NOT NULL,
  `diagnostico` text NOT NULL,
  `nota` text DEFAULT NULL,
  `impresion` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.consultas: ~3 rows (aproximadamente)
INSERT INTO `consultas` (`id`, `nombre`, `fecha`, `diagnostico`, `nota`, `impresion`) VALUES
	(10, 'Tania Torres', '2025-08-11', 'Estres cronico', '', ''),
	(11, 'Daniel Vargas', '2025-08-11', 'Deficit de atención', '', ''),
	(12, 'Pedro Sanchez', '2025-08-11', 'Dolor de cabeza', '', '');

-- Volcando estructura para tabla estadia.documento
CREATE TABLE IF NOT EXISTS `documento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `alumno_mtr` int(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `documento_ibfk_2` (`alumno_mtr`),
  CONSTRAINT `documento_ibfk_2` FOREIGN KEY (`alumno_mtr`) REFERENCES `alumnos` (`matricula`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.documento: ~0 rows (aproximadamente)

-- Volcando estructura para tabla estadia.jornadamedica
CREATE TABLE IF NOT EXISTS `jornadamedica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `name` text DEFAULT 'sin descripción',
  `access_code` varchar(20) DEFAULT NULL,
  `state` enum('active','inactive') DEFAULT 'inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.jornadamedica: ~2 rows (aproximadamente)
INSERT INTO `jornadamedica` (`id`, `date`, `name`, `access_code`, `state`) VALUES
	(1, '2025-08-30 18:33:38', 'Prueba 20 digitos', '6YINT87MDEHWJAK15GLO', 'inactive'),
	(2, '2025-08-31 01:47:45', 'Hi', 'AQ78D3B5NI2JWUKXV4P1', 'inactive');

-- Volcando estructura para tabla estadia.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `nombre` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pwd` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.usuarios: ~1 rows (aproximadamente)
INSERT INTO `usuarios` (`nombre`, `id`, `pwd`) VALUES
	('Admin', 1, '12345');

-- Volcando estructura para tabla estadia.vacunas
CREATE TABLE IF NOT EXISTS `vacunas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla estadia.vacunas: ~7 rows (aproximadamente)
INSERT INTO `vacunas` (`id`, `nombre`, `fecha`) VALUES
	(1, 'alguna', '2025-06-02'),
	(2, 'covid', '2025-06-04'),
	(3, 'influenza', '2025-06-05'),
	(4, 'sarampion', '2025-06-06'),
	(5, 'test', '2025-06-18'),
	(6, 'asd', '0000-00-00'),
	(7, 'asd', '2025-08-11');

-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `all_alumno`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `all_alumno` AS SELECT 
        `a`.`nombre` AS `nombre`,
        `a`.`genero` AS `genero`,
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
