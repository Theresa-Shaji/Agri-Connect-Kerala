-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 13, 2026 at 02:42 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agriconnectkerala`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblbuyer`
--

DROP TABLE IF EXISTS `tblbuyer`;
CREATE TABLE IF NOT EXISTS `tblbuyer` (
  `buyerid` int(11) NOT NULL AUTO_INCREMENT,
  `loginid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `districtid` int(11) NOT NULL,
  `locationid` int(11) NOT NULL,
  `address` text NOT NULL,
  `regdate` date NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`buyerid`),
  KEY `loginid` (`loginid`),
  KEY `districtid` (`districtid`),
  KEY `locationid` (`locationid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblbuyer`
--

INSERT INTO `tblbuyer` (`buyerid`, `loginid`, `name`, `email`, `phone`, `districtid`, `locationid`, `address`, `regdate`, `status`) VALUES
(1, 20, 'Lejo Joseph', 'lejojoseph@gmail.com', '9497476475', 6, 13, 'Market Road, Aluva, Ernakulam', '2026-08-27', 'Active'),
(2, 21, 'Suresh Babu', 'sureshbabu@gmail.com', '9847123456', 4, 9, 'Muvattupuzha Road, Thodupuzha, Idukki', '2026-08-27', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblbuyerpayment`
--

DROP TABLE IF EXISTS `tblbuyerpayment`;
CREATE TABLE IF NOT EXISTS `tblbuyerpayment` (
  `buyerpaymentid` int(11) NOT NULL AUTO_INCREMENT,
  `requestid` int(11) NOT NULL,
  `buyerid` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `quantity` decimal(10,0) NOT NULL,
  `priceperunit` decimal(10,0) NOT NULL,
  `totalamount` decimal(10,0) NOT NULL,
  `advamount` decimal(10,0) NOT NULL,
  `paymentdate` date NOT NULL,
  `paymentstatus` varchar(20) NOT NULL,
  `transactionid` varchar(50) NOT NULL,
  PRIMARY KEY (`buyerpaymentid`),
  KEY `requestid` (`requestid`),
  KEY `buyerid` (`buyerid`),
  KEY `farmerid` (`farmerid`),
  KEY `productid` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblbuyerpayment`
--

INSERT INTO `tblbuyerpayment` (`buyerpaymentid`, `requestid`, `buyerid`, `farmerid`, `productid`, `quantity`, `priceperunit`, `totalamount`, `advamount`, `paymentdate`, `paymentstatus`, `transactionid`) VALUES
(1, 1, 2, 9, 2, '50', '900', '45000', '9000', '2026-08-27', 'Paid', 'BUY1787815075288');

-- --------------------------------------------------------

--
-- Table structure for table `tblcategory`
--

DROP TABLE IF EXISTS `tblcategory`;
CREATE TABLE IF NOT EXISTS `tblcategory` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblcategory`
--

INSERT INTO `tblcategory` (`categoryid`, `categoryname`, `image`) VALUES
(1, 'Nutmeg With Shell', 'nutmeg with shell.jpg'),
(2, 'Nutmeg Without Shell', 'without shell.jpg'),
(3, 'Nutmeg Mace', 'Mace nutmeg.jpg'),
(4, 'Cardamom', 'images (13).jpg'),
(5, 'Pepper', 'black peper.jpg'),
(6, 'Clove', 'Clove.webp'),
(7, 'Ginger', 'Ginger.jpg'),
(8, 'Coconut', 'coconut.jpg'),
(9, 'Rubber', 'rubber.jpg'),
(10, 'Cocoa', 'cocoa.webp'),
(11, 'Banana', 'babnana.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbldistrict`
--

DROP TABLE IF EXISTS `tbldistrict`;
CREATE TABLE IF NOT EXISTS `tbldistrict` (
  `districtid` int(11) NOT NULL AUTO_INCREMENT,
  `districtname` varchar(50) NOT NULL,
  PRIMARY KEY (`districtid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbldistrict`
--

INSERT INTO `tbldistrict` (`districtid`, `districtname`) VALUES
(1, 'Thiruvananthapuram'),
(2, 'Kollam'),
(4, 'Idukki'),
(5, 'Alappuzha'),
(6, 'Ernakulam'),
(7, 'Wayanad'),
(8, 'Kasaragod'),
(9, 'Kozhikode'),
(10, 'Kottayam'),
(11, 'Malappuram'),
(12, 'Palakkad');

-- --------------------------------------------------------

--
-- Table structure for table `tblfarmer`
--

DROP TABLE IF EXISTS `tblfarmer`;
CREATE TABLE IF NOT EXISTS `tblfarmer` (
  `farmerid` int(11) NOT NULL AUTO_INCREMENT,
  `loginid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `districtid` int(11) NOT NULL,
  `locationid` int(11) NOT NULL,
  `address` text NOT NULL,
  `regdate` date NOT NULL,
  `status` varchar(200) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`farmerid`),
  KEY `loginid` (`loginid`),
  KEY `districtid` (`districtid`),
  KEY `locationid` (`locationid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblfarmer`
--

INSERT INTO `tblfarmer` (`farmerid`, `loginid`, `name`, `email`, `phone`, `districtid`, `locationid`, `address`, `regdate`, `status`, `image`) VALUES
(1, 11, 'Amal Jose', 'amal123@gmail.com', '6238088625', 4, 10, 'Mankulam Road, Adimali, Idukki', '2026-08-27', 'Accepted', '360_F_432151892_oQ3YQDo2LYZPILlEMnlo55PjjgiUwnQb.jpg'),
(2, 12, 'Thomas Mathew', 'thomasmathew@gmail.com', '9876543213', 4, 11, 'Vazhavara Road, Kattappana, Idukki', '2026-08-27', 'Accepted', '360_F_1575486374_1z8JVX4Mew3g7qkLIydsJu1YiRI49SE1.jpg'),
(3, 13, 'Sarojini P', 'sarojini123@gmail.com', '9497476479', 10, 24, 'Meenachil, changanaserry, Kottayam', '2026-08-27', 'Accepted', '360_F_1368676790_19jDvjglnvGeYJEDMfSUFL18a6AcTCC6.jpg'),
(4, 14, 'Joseph Mathew', 'joseph.mathew@gmail.com', '9876543217', 10, 24, 'pala main town Road,pala', '2026-08-27', 'Accepted', 'farmer-working-his-paddy-field-7575712.webp'),
(5, 15, 'Vinod Kumar', 'vinod.kumar@example.com', '9876543219', 12, 29, 'Kumaramputhur Road, ottapalam, Palakkad', '2026-08-27', 'Accepted', 'images (1).jpg'),
(6, 16, 'Manoj Kumar', 'manoj.kumar@gmail.com', '9876543215', 4, 11, 'Vazhathoppu Road, Kattappana, Idukki, Kerala – 685508', '2026-08-27', 'Accepted', 'images (2).jpg'),
(7, 17, 'Ammu Shaji', 'theresashaji25@gmail.com', '6238088624', 6, 13, 'Companypady, Aluva, Ernakulam, Kerala – 683102', '2026-08-27', 'Accepted', 'istockphoto-2148858499-612x612.jpg'),
(8, 18, 'Sunny kurian', 'sunnykurian@gmail.com', '6238088622', 6, 13, 'Choornikkara, Aluva, Ernakulam, Kerala – 683106', '2026-08-27', 'Accepted', 'images (3).jpg'),
(9, 19, 'Albert Wilson', 'albertwilson@gmail.com', '9497476471', 6, 13, 'U.C. College Road, Aluva, Ernakulam, Kerala – 683102', '2026-08-27', 'Accepted', 'indian-farmer-empty-hand-product-putting-pointing-finger-174017270.webp');

-- --------------------------------------------------------

--
-- Table structure for table `tblfeedback`
--

DROP TABLE IF EXISTS `tblfeedback`;
CREATE TABLE IF NOT EXISTS `tblfeedback` (
  `feedbackid` int(11) NOT NULL AUTO_INCREMENT,
  `requestid` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `feedbackdate` date NOT NULL,
  `buyerid` int(11) DEFAULT NULL,
  `shopownerid` int(11) DEFAULT NULL,
  `fromusertype` varchar(20) NOT NULL,
  PRIMARY KEY (`feedbackid`),
  KEY `requestid` (`requestid`),
  KEY `farmerid` (`farmerid`),
  KEY `productid` (`productid`),
  KEY `shopownerid` (`shopownerid`),
  KEY `buyerid` (`buyerid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblfeedback`
--

INSERT INTO `tblfeedback` (`feedbackid`, `requestid`, `farmerid`, `productid`, `rating`, `feedback`, `feedbackdate`, `buyerid`, `shopownerid`, `fromusertype`) VALUES
(1, 1, 9, 2, 5, 'Good Quality Product', '2026-08-27', NULL, NULL, 'Buyer'),
(2, 2, 9, 1, 3, 'Good Quality', '2026-08-27', NULL, 2, 'ShopOwner');

-- --------------------------------------------------------

--
-- Table structure for table `tbllocation`
--

DROP TABLE IF EXISTS `tbllocation`;
CREATE TABLE IF NOT EXISTS `tbllocation` (
  `locationid` int(11) NOT NULL AUTO_INCREMENT,
  `districtid` int(11) NOT NULL,
  `locationname` varchar(100) NOT NULL,
  PRIMARY KEY (`locationid`),
  KEY `districtid` (`districtid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbllocation`
--

INSERT INTO `tbllocation` (`locationid`, `districtid`, `locationname`) VALUES
(1, 1, 'Neyyattinkara'),
(2, 1, 'Attingal'),
(3, 1, 'Varkala'),
(4, 1, 'Nedumangad'),
(5, 1, 'Kazhakkoottam'),
(6, 2, 'Karunagappally'),
(7, 2, 'Kottarakkara'),
(8, 2, 'Punalur'),
(9, 4, 'Thodupuzha'),
(10, 4, 'Adimali'),
(11, 4, 'Kattappana'),
(12, 4, 'Nedumkandam'),
(13, 6, 'Aluva'),
(14, 6, 'Perumbavoor'),
(15, 6, 'Muvattupuzha'),
(16, 6, 'Angamaly'),
(17, 5, 'Kayamkulam'),
(18, 5, 'Chengannur'),
(19, 7, 'Meppadi'),
(20, 7, 'Mananthavady'),
(21, 8, 'Kanhangad'),
(22, 8, 'Nileshwaram'),
(23, 8, 'Manjeshwar'),
(24, 10, 'Changanassery'),
(25, 10, 'Vaikom'),
(26, 10, 'Erattupetta'),
(27, 11, 'Perinthalmanna'),
(28, 11, 'Manjeri'),
(29, 12, 'Ottapalam'),
(30, 12, 'Chittur');

-- --------------------------------------------------------

--
-- Table structure for table `tbllogin`
--

DROP TABLE IF EXISTS `tbllogin`;
CREATE TABLE IF NOT EXISTS `tbllogin` (
  `loginid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`loginid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbllogin`
--

INSERT INTO `tbllogin` (`loginid`, `username`, `password`, `role`, `status`) VALUES
(1, 'admin', 'admin', 'Admin', ''),
(2, 'Suresh', 'Suresh@123', 'shopowner', 'Accepted'),
(3, 'Anil123', 'Anil@123', 'shopowner', 'Accepted'),
(5, 'Rajesh', 'Rajesh@123', 'shopowner', 'Rejected'),
(6, 'Niyas123', 'Niyas@123', 'shopowner', 'Accepted'),
(7, 'Thomas', 'Thomas@123', 'shopowner', 'Accepted'),
(8, 'Arun123', 'Arun@123', 'shopowner', 'Accepted'),
(9, 'Deepak', 'Deepak@123', 'shopowner', 'requested'),
(10, 'Theresa123', 'Theresa@123', 'shopowner', 'requested'),
(11, 'Amal123', 'Amal@123', 'Farmer', 'Accepted'),
(12, 'Thomas', 'Thomas@123', 'Farmer', 'Accepted'),
(13, 'Sarojini', 'Sarojini123', 'Farmer', 'Accepted'),
(14, 'Joseph', 'Joseph123', 'Farmer', 'Accepted'),
(15, 'Vinod', 'Vinod123', 'Farmer', 'Accepted'),
(16, 'Manoj', 'Manoj123', 'Farmer', 'Accepted'),
(17, 'Ammu12', 'Ammu123', 'Farmer', 'Accepted'),
(18, 'Sunny', 'Sunny123', 'Farmer', 'Accepted'),
(19, 'Albert', 'Albert123', 'Farmer', 'Accepted'),
(20, 'Lejo123', 'Lejo@123', 'Buyer', 'Active'),
(21, 'Sureshp', 'Suresh@123', 'Buyer', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblpayment`
--

DROP TABLE IF EXISTS `tblpayment`;
CREATE TABLE IF NOT EXISTS `tblpayment` (
  `paymentid` int(11) NOT NULL AUTO_INCREMENT,
  `requestid` int(11) NOT NULL,
  `buyerid` int(11) DEFAULT NULL,
  `farmerid` int(11) NOT NULL,
  `shopownerid` int(11) DEFAULT NULL,
  `advamount` decimal(10,0) NOT NULL,
  `paymentdate` date NOT NULL,
  `paymentstatus` varchar(30) NOT NULL,
  `transactionid` varchar(100) NOT NULL,
  PRIMARY KEY (`paymentid`),
  KEY `requestid` (`requestid`),
  KEY `farmerid` (`farmerid`),
  KEY `shopownerid` (`shopownerid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblpayment`
--

INSERT INTO `tblpayment` (`paymentid`, `requestid`, `buyerid`, `farmerid`, `shopownerid`, `advamount`, `paymentdate`, `paymentstatus`, `transactionid`) VALUES
(1, 2, NULL, 9, 2, '21700', '2026-08-27', 'Paid', 'ACKTXN1787816073408'),
(2, 4, NULL, 9, 2, '1900', '2026-09-01', 'Paid', 'ACKTXN1788221148047');

-- --------------------------------------------------------

--
-- Table structure for table `tblpriceupdate`
--

DROP TABLE IF EXISTS `tblpriceupdate`;
CREATE TABLE IF NOT EXISTS `tblpriceupdate` (
  `priceid` int(11) NOT NULL AUTO_INCREMENT,
  `shopownerid` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `price` decimal(11,0) NOT NULL,
  `updatedate` date NOT NULL,
  `unit` varchar(30) NOT NULL,
  `trend` varchar(30) NOT NULL,
  PRIMARY KEY (`priceid`),
  KEY `categoryid` (`categoryid`),
  KEY `shopownerid` (`shopownerid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblpriceupdate`
--

INSERT INTO `tblpriceupdate` (`priceid`, `shopownerid`, `categoryid`, `price`, `updatedate`, `unit`, `trend`) VALUES
(1, 1, 4, '2955', '2026-08-24', 'Kg', 'Stable'),
(2, 1, 5, '700', '2026-08-25', 'Kg', 'Stable'),
(3, 1, 6, '900', '2026-08-25', 'Kg', 'Stable'),
(4, 1, 1, '340', '2026-08-25', 'Kg', 'Increase'),
(5, 1, 2, '650', '2026-08-25', 'Kg', 'Stable'),
(6, 1, 3, '2300', '2026-08-25', 'Kg', 'Increase'),
(7, 2, 1, '350', '2026-08-25', 'Kg', 'Increase'),
(8, 2, 2, '680', '2026-08-25', 'Kg', 'Increase'),
(9, 2, 3, '2400', '2026-08-25', 'Kg', 'Stable'),
(10, 2, 4, '3050', '2026-08-25', 'Kg', 'Increase'),
(11, 2, 5, '695', '2026-08-25', 'Kg', 'Decrease'),
(12, 2, 6, '825', '2026-08-25', 'Kg', 'Increase'),
(13, 2, 9, '270', '2026-08-25', 'Kg', 'Stable'),
(14, 2, 11, '45', '2026-08-25', 'Kg', 'Decrease'),
(15, 6, 4, '3020', '2026-08-25', 'Kg', 'Increase'),
(16, 6, 5, '710', '2026-08-25', 'Kg', 'Stable'),
(17, 6, 1, '345', '2026-08-25', 'Kg', 'Increase'),
(18, 6, 2, '625', '2026-08-25', 'Kg', 'Increase'),
(19, 6, 3, '1480', '2026-08-25', 'Kg', 'Increase'),
(20, 6, 11, '50', '2026-08-25', 'Kg', 'Increase'),
(21, 6, 10, '80', '2026-08-25', 'Kg', 'Increase'),
(22, 6, 9, '275', '2026-08-25', 'Kg', 'Increase'),
(23, 6, 8, '68', '2026-08-25', 'Kg', 'Stable'),
(24, 6, 6, '840', '2026-08-25', 'Kg', 'Increase'),
(25, 2, 1, '360', '2026-08-27', 'Kg', 'Increase'),
(26, 2, 2, '670', '2026-08-25', 'Kg', 'Decrease'),
(27, 2, 5, '676', '2026-08-27', 'Kg', 'Increase'),
(28, 2, 4, '3100', '2026-08-31', 'Kg', 'Increase');

-- --------------------------------------------------------

--
-- Table structure for table `tblproduct`
--

DROP TABLE IF EXISTS `tblproduct`;
CREATE TABLE IF NOT EXISTS `tblproduct` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `farmerid` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `productname` varchar(30) NOT NULL,
  `quantity` decimal(25,0) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `quality` varchar(30) NOT NULL,
  `expectedprice` decimal(10,0) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `uploaddate` date NOT NULL,
  `districtid` int(11) NOT NULL,
  `locationid` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`productid`),
  KEY `farmerid` (`farmerid`),
  KEY `categoryid` (`categoryid`),
  KEY `districtid` (`districtid`),
  KEY `locationid` (`locationid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproduct`
--

INSERT INTO `tblproduct` (`productid`, `farmerid`, `categoryid`, `productname`, `quantity`, `unit`, `quality`, `expectedprice`, `image`, `description`, `uploaddate`, `districtid`, `locationid`, `status`) VALUES
(1, 9, 4, 'Dried Cardamom', '50', 'Kg', 'Excellent', '2177', 'images (13).jpg', 'Fresh, high-quality green cardamom suitable for wholesale purchase.', '2026-08-27', 4, 11, 'Available'),
(2, 9, 6, 'Dried Clove', '50', 'Kg', 'Excellent', '900', 'Clove.webp', 'High-quality dried cloves with strong aroma, suitable for wholesale and spice processing.', '2026-08-27', 4, 11, 'Available'),
(3, 9, 9, 'Ribbed Smoked Sheet (RSS)', '100', 'Kg', 'Excellent', '190', 'rubber.jpg', 'Good-quality natural rubber sheets, properly smoked and dried, suitable for wholesale purchase.', '2026-08-27', 4, 11, 'Available'),
(4, 8, 8, 'Fresh Coconut', '200', 'Kg', 'Excellent', '45', 'coconut.jpg', 'Fresh, mature coconuts with good quality, suitable for household consumption and wholesale purchase.', '2026-08-27', 6, 13, 'Available'),
(5, 8, 8, 'Copra', '100', 'Kg', 'Good', '140', 'copra.jpg', 'High-quality dried coconut (copra), properly dried and well-maintained, suitable for coconut oil production and wholesale purchase.', '2026-08-27', 6, 13, 'Available'),
(6, 8, 11, 'Nendran Banana', '100', 'Kg', 'Excellent', '60', 'Nendran Banana.jpg', 'Fresh, mature Nendran bananas with good quality and natural taste, suitable for retail and wholesale purchase.', '2026-08-27', 6, 13, 'Available'),
(7, 6, 1, 'Nutmeg', '50', 'Kg', 'Excellent', '500', 'nut shell.jpg', 'Good-quality dried nutmeg with shell, properly dried and suitable for spice processing, wholesale purchase, and storage.', '2026-08-27', 4, 11, 'Available'),
(8, 6, 10, 'Dried Cocoa Beans', '50', 'Kg', 'Excellent', '250', 'cocoa.webp', 'Good-quality fermented and properly dried cocoa beans, suitable for chocolate production and wholesale purchase.', '2026-08-27', 4, 11, 'Available'),
(9, 3, 7, 'Fresh Ginger', '100', 'Kg', 'Excellent', '100', 'Ginger.jpg', 'Fresh, good-quality ginger with strong aroma and natural flavor, properly cleaned and suitable for household consumption, spice processing, and wholesale purchase.', '2026-08-27', 10, 24, 'Available'),
(10, 3, 3, 'Dried Mace', '25', 'Kg', 'Excellent', '1500', 'dried mccae.jpg', 'High-quality dried mace with a rich aroma and natural flavor, carefully dried and suitable for spice processing, cooking, and wholesale purchase.', '2026-08-27', 10, 24, 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `tblpurchaserequest`
--

DROP TABLE IF EXISTS `tblpurchaserequest`;
CREATE TABLE IF NOT EXISTS `tblpurchaserequest` (
  `requestid` int(11) NOT NULL AUTO_INCREMENT,
  `buyerid` int(15) NOT NULL,
  `usertype` varchar(20) NOT NULL,
  `farmerid` int(15) NOT NULL,
  `productid` int(15) NOT NULL,
  `quantity` decimal(10,0) NOT NULL,
  `offeredprice` decimal(10,0) NOT NULL,
  `message` text NOT NULL,
  `requestdate` date NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`requestid`),
  KEY `farmerid` (`farmerid`),
  KEY `productid` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblpurchaserequest`
--

INSERT INTO `tblpurchaserequest` (`requestid`, `buyerid`, `usertype`, `farmerid`, `productid`, `quantity`, `offeredprice`, `message`, `requestdate`, `status`) VALUES
(1, 2, 'Buyer', 9, 2, '50', '900', 'Hello, I am interested in purchasing your product. Please confirm the availability and quality. Kindly consider my purchase request.', '2026-08-27', 'Paid'),
(2, 2, 'ShopOwner', 9, 1, '50', '2170', 'Hello, I am interested in purchasing your product. Please confirm the availability and quality. Kindly consider my purchase request.', '2026-08-27', 'Advance Paid'),
(3, 2, 'ShopOwner', 9, 2, '50', '900', 'Hello, I am interested in purchasing your product. Please confirm the availability and quality. Kindly consider my purchase request.', '2026-08-27', 'Pending'),
(4, 2, 'ShopOwner', 9, 3, '50', '190', 'please respond quickly', '2026-09-01', 'Advance Paid'),
(5, 2, 'Buyer', 6, 7, '50', '500', 'Hello i am interested in purchasing your product ', '2026-09-01', 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `tblshopowner`
--

DROP TABLE IF EXISTS `tblshopowner`;
CREATE TABLE IF NOT EXISTS `tblshopowner` (
  `shopownerid` int(11) NOT NULL AUTO_INCREMENT,
  `loginid` int(11) NOT NULL,
  `shopname` varchar(100) NOT NULL,
  `ownername` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneno` varchar(15) NOT NULL,
  `districtid` int(11) NOT NULL,
  `locationid` int(11) NOT NULL,
  `address` text NOT NULL,
  `regdate` date NOT NULL,
  `status` varchar(30) NOT NULL,
  `image` varchar(300) NOT NULL,
  `licenseno` varchar(100) NOT NULL,
  `licensedocument` varchar(300) NOT NULL,
  PRIMARY KEY (`shopownerid`),
  KEY `districtid` (`districtid`),
  KEY `locationid` (`locationid`),
  KEY `loginid` (`loginid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblshopowner`
--

INSERT INTO `tblshopowner` (`shopownerid`, `loginid`, `shopname`, `ownername`, `email`, `phoneno`, `districtid`, `locationid`, `address`, `regdate`, `status`, `image`, `licenseno`, `licensedocument`) VALUES
(1, 2, 'Kerala Agro Traders', 'Suresh Kumar', 'sureshagro@gmail.com', '9876543210', 4, 9, 'Muvattupuzha Road, Thodupuzha', '2026-08-25', 'Accepted', '1787640132268.jpg', 'LICIDK001', '1787640132281.jpg'),
(2, 3, 'High Range Spices', 'Anil Joseph', 'anilspices@gmail.com', '9847123456', 4, 11, 'Market Road, Kattappana', '2026-08-25', 'Accepted', '1787640295639.jpg', 'LICIDK002', '1787640132281.jpg'),
(4, 5, 'Farmers Choice', 'Rajesh P', 'farmerschoice@gmail.com', '9746123456', 6, 14, 'MC Road, Perumbavoor', '2026-08-25', 'pending', '1787640553124.jpg', 'LICEKM002', '1787640553124.jpg'),
(5, 6, 'Malabar Agro Centre', 'Niyas K', 'malabaragro@gmail.com', '9633123456', 10, 24, 'Main Market Road,Changanaserry', '2026-08-25', 'Accepted', '1787640673883.jpg', 'LICKZD001', '1787640673884.jpg'),
(6, 7, 'Wayanad Spices Hub', 'Thomas George', 'wayanadspices@gmail.com', '9656123478', 7, 19, 'Market Road, Meppadi', '2026-08-25', 'Accepted', '1787640794792.jpg', 'LICWYD001', '1787640794793.jpg'),
(7, 8, 'Green Kerala Traders', 'Arun Raj', 'greenkerala@gmail.com', '9778123456', 10, 25, 'Market Road, vaikom', '2026-08-25', 'Accepted', '1787640925655.jpg', 'LICKTM001', '1787640925657.jpg'),
(8, 9, 'Kerala Farm Products', 'Deepak S', 'kerala.farm@gmail.com', '9567123489', 12, 29, 'Main Road, Ottapalam', '2026-08-25', 'pending', '1787641025331.jpg', 'LICPKD001', '1787641025332.jpg'),
(9, 10, 'Green Valley Traders', 'Theresa Shaji', 'theresashaji09@gmail.com', '8281796478', 6, 16, 'Market Road Angamaly', '2026-08-25', 'pending', '1787641541221.jpg', 'LICEKM001', '1787640132281.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tblshopownercategory`
--

DROP TABLE IF EXISTS `tblshopownercategory`;
CREATE TABLE IF NOT EXISTS `tblshopownercategory` (
  `shopownercategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `shopownerid` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  PRIMARY KEY (`shopownercategoryid`),
  KEY `categoryid` (`categoryid`),
  KEY `shopownerid` (`shopownerid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblshopownercategory`
--

INSERT INTO `tblshopownercategory` (`shopownercategoryid`, `shopownerid`, `categoryid`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 2, 1),
(8, 2, 2),
(9, 2, 3),
(10, 2, 4),
(11, 2, 5),
(12, 2, 6),
(13, 2, 9),
(14, 2, 11),
(15, 2, 10),
(16, 2, 7),
(17, 6, 1),
(18, 6, 2),
(19, 6, 3),
(20, 6, 4),
(21, 6, 5),
(22, 6, 5),
(23, 6, 6),
(24, 6, 9),
(25, 6, 10),
(26, 6, 11),
(27, 6, 8);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblbuyer`
--
ALTER TABLE `tblbuyer`
  ADD CONSTRAINT `tblbuyer_ibfk_1` FOREIGN KEY (`loginid`) REFERENCES `tbllogin` (`loginid`),
  ADD CONSTRAINT `tblbuyer_ibfk_2` FOREIGN KEY (`districtid`) REFERENCES `tbldistrict` (`districtid`),
  ADD CONSTRAINT `tblbuyer_ibfk_3` FOREIGN KEY (`locationid`) REFERENCES `tbllocation` (`locationid`);

--
-- Constraints for table `tblbuyerpayment`
--
ALTER TABLE `tblbuyerpayment`
  ADD CONSTRAINT `tblbuyerpayment_ibfk_1` FOREIGN KEY (`requestid`) REFERENCES `tblpurchaserequest` (`requestid`),
  ADD CONSTRAINT `tblbuyerpayment_ibfk_2` FOREIGN KEY (`buyerid`) REFERENCES `tblbuyer` (`buyerid`),
  ADD CONSTRAINT `tblbuyerpayment_ibfk_3` FOREIGN KEY (`farmerid`) REFERENCES `tblfarmer` (`farmerid`),
  ADD CONSTRAINT `tblbuyerpayment_ibfk_4` FOREIGN KEY (`productid`) REFERENCES `tblproduct` (`productid`);

--
-- Constraints for table `tblfarmer`
--
ALTER TABLE `tblfarmer`
  ADD CONSTRAINT `tblfarmer_ibfk_1` FOREIGN KEY (`loginid`) REFERENCES `tbllogin` (`loginid`),
  ADD CONSTRAINT `tblfarmer_ibfk_2` FOREIGN KEY (`districtid`) REFERENCES `tbldistrict` (`districtid`),
  ADD CONSTRAINT `tblfarmer_ibfk_3` FOREIGN KEY (`locationid`) REFERENCES `tbllocation` (`locationid`);

--
-- Constraints for table `tblfeedback`
--
ALTER TABLE `tblfeedback`
  ADD CONSTRAINT `tblfeedback_ibfk_1` FOREIGN KEY (`requestid`) REFERENCES `tblpurchaserequest` (`requestid`),
  ADD CONSTRAINT `tblfeedback_ibfk_2` FOREIGN KEY (`farmerid`) REFERENCES `tblfarmer` (`farmerid`),
  ADD CONSTRAINT `tblfeedback_ibfk_3` FOREIGN KEY (`productid`) REFERENCES `tblproduct` (`productid`),
  ADD CONSTRAINT `tblfeedback_ibfk_4` FOREIGN KEY (`shopownerid`) REFERENCES `tblshopowner` (`shopownerid`),
  ADD CONSTRAINT `tblfeedback_ibfk_5` FOREIGN KEY (`buyerid`) REFERENCES `tblbuyer` (`buyerid`);

--
-- Constraints for table `tbllocation`
--
ALTER TABLE `tbllocation`
  ADD CONSTRAINT `tbllocation_ibfk_1` FOREIGN KEY (`districtid`) REFERENCES `tbldistrict` (`districtid`);

--
-- Constraints for table `tblpayment`
--
ALTER TABLE `tblpayment`
  ADD CONSTRAINT `tblpayment_ibfk_1` FOREIGN KEY (`requestid`) REFERENCES `tblpurchaserequest` (`requestid`),
  ADD CONSTRAINT `tblpayment_ibfk_2` FOREIGN KEY (`farmerid`) REFERENCES `tblfarmer` (`farmerid`),
  ADD CONSTRAINT `tblpayment_ibfk_3` FOREIGN KEY (`shopownerid`) REFERENCES `tblshopowner` (`shopownerid`);

--
-- Constraints for table `tblpriceupdate`
--
ALTER TABLE `tblpriceupdate`
  ADD CONSTRAINT `tblpriceupdate_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `tblcategory` (`categoryid`),
  ADD CONSTRAINT `tblpriceupdate_ibfk_2` FOREIGN KEY (`shopownerid`) REFERENCES `tblshopowner` (`shopownerid`);

--
-- Constraints for table `tblproduct`
--
ALTER TABLE `tblproduct`
  ADD CONSTRAINT `tblproduct_ibfk_1` FOREIGN KEY (`farmerid`) REFERENCES `tblfarmer` (`farmerid`),
  ADD CONSTRAINT `tblproduct_ibfk_2` FOREIGN KEY (`categoryid`) REFERENCES `tblcategory` (`categoryid`),
  ADD CONSTRAINT `tblproduct_ibfk_3` FOREIGN KEY (`districtid`) REFERENCES `tbldistrict` (`districtid`),
  ADD CONSTRAINT `tblproduct_ibfk_4` FOREIGN KEY (`locationid`) REFERENCES `tbllocation` (`locationid`);

--
-- Constraints for table `tblpurchaserequest`
--
ALTER TABLE `tblpurchaserequest`
  ADD CONSTRAINT `tblpurchaserequest_ibfk_1` FOREIGN KEY (`farmerid`) REFERENCES `tblfarmer` (`farmerid`),
  ADD CONSTRAINT `tblpurchaserequest_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `tblproduct` (`productid`);

--
-- Constraints for table `tblshopowner`
--
ALTER TABLE `tblshopowner`
  ADD CONSTRAINT `tblshopowner_ibfk_1` FOREIGN KEY (`districtid`) REFERENCES `tbldistrict` (`districtid`),
  ADD CONSTRAINT `tblshopowner_ibfk_2` FOREIGN KEY (`locationid`) REFERENCES `tbllocation` (`locationid`),
  ADD CONSTRAINT `tblshopowner_ibfk_3` FOREIGN KEY (`loginid`) REFERENCES `tbllogin` (`loginid`);

--
-- Constraints for table `tblshopownercategory`
--
ALTER TABLE `tblshopownercategory`
  ADD CONSTRAINT `tblshopownercategory_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `tblcategory` (`categoryid`),
  ADD CONSTRAINT `tblshopownercategory_ibfk_2` FOREIGN KEY (`shopownerid`) REFERENCES `tblshopowner` (`shopownerid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
