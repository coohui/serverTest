-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-08-05 12:50:07
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- 表的结构 `coolup`
--

CREATE TABLE IF NOT EXISTS `coolup` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `tSize` varchar(10) DEFAULT NULL,
  `cd` varchar(100) DEFAULT NULL,
  `tm` varchar(12) DEFAULT NULL,
  `start` varchar(10) DEFAULT NULL,
  `upIndex` int(6) DEFAULT NULL,
  `complete` int(1) DEFAULT NULL,
  `type` varchar(6) DEFAULT NULL,
  `path` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `loaded` varchar(10) DEFAULT NULL,
  `upProgress` varchar(10) DEFAULT NULL,
  `len` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1099 ;

--
-- 转存表中的数据 `coolup`
--

INSERT INTO `coolup` (`id`, `name`, `tSize`, `cd`, `tm`, `start`, `upIndex`, `complete`, `type`, `path`, `loaded`, `upProgress`, `len`) VALUES
(1097, 'QQ图片20170322093636.jpg', '46575', '149014656890146575', '2017-08-03', '0', 1, 1, NULL, 'upload/QQ图片20170322093636.jpg', NULL, '0', 1),
(1098, '前端开发框架使用指南.pptx', '3574902', '14991558052663574902', '2017-08-03', '0', 1, 1, NULL, 'upload/前端开发框架使用指南.pptx', NULL, '0', 4);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
