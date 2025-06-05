-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2025 a las 17:37:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `estadia`
--

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `all_alumno`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `all_alumno` (
`id` int(11)
,`nombre` varchar(255)
,`matricula` varchar(50)
,`telefono` varchar(20)
,`correo` varchar(255)
,`carrera` varchar(100)
,`CURP` varchar(20)
,`ciudad` varchar(100)
,`domicilio` text
,`edad` int(11)
,`NSS` varchar(20)
,`afiliacion` varchar(100)
,`RH` varchar(5)
,`donador` varchar(10)
,`peso` varchar(10)
,`talla` varchar(10)
,`alergias` text
,`enfermedades` text
,`tratamientos` text
,`discapacidad` text
,`enCasoDeAccidente` text
,`vacunas_json` mediumtext
,`conferencias_json` mediumtext
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `matricula` varchar(50) NOT NULL,
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
  `enCasoDeAccidente` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `nombre`, `matricula`, `telefono`, `correo`, `carrera`, `CURP`, `ciudad`, `domicilio`, `edad`, `NSS`, `afiliacion`, `RH`, `donador`, `peso`, `talla`, `alergias`, `enfermedades`, `tratamientos`, `discapacidad`, `enCasoDeAccidente`) VALUES
(1, 'Juan Pérez', 'A001', '555-123-4567', 'juan.perez@example.com', 'Ingeniería en Sistemas', 'PEPJ900101HDFRRN09', 'Ciudad de México', 'Av. Reforma #123', 25, '12345678901', 'IMSS', 'O+', 'Sí', '70kg', '1.75m', 'Ninguna', 'Asma', 'Inhaladores', 'Ninguna', 'Llamar a María Pérez 555-765-4321'),
(2, 'Ana López', 'A002', '555-987-6543', 'ana.lopez@example.com', 'Medicina', 'LOPA980202MDFRZN07', 'Guadalajara', 'Calle Juárez #456', 22, '98765432109', 'ISSSTE', 'A-', 'No', '60kg', '1.65m', 'Penicilina', 'Ninguna', 'Ninguno', 'Auditiva', 'Llamar a José López 555-321-7654');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnovacuna`
--

CREATE TABLE `alumnovacuna` (
  `id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `vacuna_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnovacuna`
--

INSERT INTO `alumnovacuna` (`id`, `estudiante_id`, `vacuna_id`) VALUES
(2, 1, 1),
(3, 1, 2),
(4, 1, 4),
(5, 2, 2),
(6, 2, 3),
(7, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conferencia`
--

CREATE TABLE `conferencia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `descripcion` text DEFAULT NULL,
  `presentador` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conferencia`
--

INSERT INTO `conferencia` (`id`, `nombre`, `fecha`, `hora`, `descripcion`, `presentador`) VALUES
(1, 'Salud mental', '2025-06-02', '10:22:35', 'tania necesita', 'Tania');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conferenciasasistidas`
--

CREATE TABLE `conferenciasasistidas` (
  `id` int(11) NOT NULL,
  `estudiante_id` int(11) DEFAULT NULL,
  `conferencia_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conferenciasasistidas`
--

INSERT INTO `conferenciasasistidas` (`id`, `estudiante_id`, `conferencia_id`) VALUES
(1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

CREATE TABLE `consultas` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `fecha` date NOT NULL,
  `diagnostico` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

CREATE TABLE `vacunas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id`, `nombre`, `fecha`) VALUES
(1, 'alguna', '2025-06-02'),
(2, 'covid', '2025-06-04'),
(3, 'influenza', '2025-06-05'),
(4, 'sarampion', '2025-06-06');

-- --------------------------------------------------------

--
-- Estructura para la vista `all_alumno`
--
DROP TABLE IF EXISTS `all_alumno`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `all_alumno`  AS SELECT `a`.`id` AS `id`, `a`.`nombre` AS `nombre`, `a`.`matricula` AS `matricula`, `a`.`telefono` AS `telefono`, `a`.`correo` AS `correo`, `a`.`carrera` AS `carrera`, `a`.`CURP` AS `CURP`, `a`.`ciudad` AS `ciudad`, `a`.`domicilio` AS `domicilio`, `a`.`edad` AS `edad`, `a`.`NSS` AS `NSS`, `a`.`afiliacion` AS `afiliacion`, `a`.`RH` AS `RH`, `a`.`donador` AS `donador`, `a`.`peso` AS `peso`, `a`.`talla` AS `talla`, `a`.`alergias` AS `alergias`, `a`.`enfermedades` AS `enfermedades`, `a`.`tratamientos` AS `tratamientos`, `a`.`discapacidad` AS `discapacidad`, `a`.`enCasoDeAccidente` AS `enCasoDeAccidente`, concat('[',group_concat(distinct concat('{"id":',`v`.`id`,',"nombre":"',`v`.`nombre`,'","fecha":"',ifnull(date_format(`v`.`fecha`,'%Y-%m-%d'),''),'"}') separator ','),']') AS `vacunas_json`, concat('[',group_concat(distinct concat('{"id":',`c`.`id`,',"nombre":"',`c`.`nombre`,'","fecha":"',`c`.`fecha`,'","hora":"',`c`.`hora`,'","descripcion":"',`c`.`descripcion`,'","presentador":"',`c`.`presentador`,'"}') separator ','),']') AS `conferencias_json` FROM ((((`alumnos` `a` left join `alumnovacuna` `av` on(`a`.`id` = `av`.`estudiante_id`)) left join `vacunas` `v` on(`av`.`vacuna_id` = `v`.`id`)) left join `conferenciasasistidas` `ca` on(`a`.`id` = `ca`.`estudiante_id`)) left join `conferencia` `c` on(`ca`.`conferencia_id` = `c`.`id`)) GROUP BY `a`.`id` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `alumnovacuna`
--
ALTER TABLE `alumnovacuna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudiante_id` (`estudiante_id`),
  ADD KEY `vacuna_id` (`vacuna_id`);

--
-- Indices de la tabla `conferencia`
--
ALTER TABLE `conferencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `conferenciasasistidas`
--
ALTER TABLE `conferenciasasistidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudiante_id` (`estudiante_id`),
  ADD KEY `conferencia_id` (`conferencia_id`);

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `alumnovacuna`
--
ALTER TABLE `alumnovacuna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `conferencia`
--
ALTER TABLE `conferencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `conferenciasasistidas`
--
ALTER TABLE `conferenciasasistidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnovacuna`
--
ALTER TABLE `alumnovacuna`
  ADD CONSTRAINT `alumnovacuna_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `alumnovacuna_ibfk_2` FOREIGN KEY (`vacuna_id`) REFERENCES `vacunas` (`id`);

--
-- Filtros para la tabla `conferenciasasistidas`
--
ALTER TABLE `conferenciasasistidas`
  ADD CONSTRAINT `conferenciasasistidas_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `conferenciasasistidas_ibfk_2` FOREIGN KEY (`conferencia_id`) REFERENCES `conferencia` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
