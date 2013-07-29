-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 16-04-2013 a las 14:59:42
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE IF NOT EXISTS `articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `author` varchar(30) CHARACTER SET latin2 COLLATE latin2_bin NOT NULL,
  `category` varchar(20) CHARACTER SET latin2 COLLATE latin2_bin NOT NULL,
  `title` varchar(40) CHARACTER SET latin2 COLLATE latin2_bin NOT NULL,
  `summary` varchar(140) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `date`, `author`, `category`, `title`, `summary`) VALUES
(26, '2013-03-19 18:51:34', 'UBA', 'asd', 'asd', 'asd'),
(27, '2013-03-19 18:52:28', 'UBA', 'asd', 'asd2222', 'asd'),
(28, '2013-03-19 19:26:41', 'UBA', 'asd', 'asd2222', 'asd'),
(29, '2013-03-20 16:58:25', 'UBA', 'asd', 'Noticia 5', 'asd'),
(30, '2013-03-20 16:58:35', 'UBA', 'asd', 'Noticia 6', 'asd'),
(31, '2013-03-20 16:58:39', 'UBA', 'asd', 'Noticia 7', 'asd'),
(32, '2013-03-20 16:58:42', 'UBA', 'asd', 'Noticia 8', 'asd'),
(33, '2013-03-20 16:58:46', 'UBA', 'asd', 'Noticia 9', 'asd'),
(34, '2013-03-20 16:58:49', 'UBA', 'asd', 'Noticia 10', 'asd'),
(35, '2013-03-20 16:58:51', 'UBA', 'asd', 'Noticia 11', 'asd'),
(36, '2013-03-20 16:58:54', 'UBA', 'asd', 'Noticia 12', 'asd'),
(37, '2013-03-20 16:58:56', 'UBA', 'asd', 'Noticia 13', 'asd'),
(38, '2013-03-20 16:58:59', 'UBA', 'asd', 'Noticia 14', 'asd'),
(39, '2013-03-20 16:59:03', 'UBA', 'asd', 'Noticia 15', 'asd'),
(40, '2013-03-20 16:59:24', 'UBA', 'asd', 'Noticia 16', 'asd'),
(41, '2013-03-20 18:58:53', 'UBA', '', 'Nueva noticia', 'noticia prueba');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
