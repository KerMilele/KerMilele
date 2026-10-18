-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: ownher_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(150) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `shade` varchar(50) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `description` varchar(500) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Soft Nude','lip-gloss',10.99,'Nude',6,'A soft nude gloss for everyday wear.','gloss1'),(2,'Warm Brown','lip-gloss',9.99,'Brown',10,'A warm brown gloss with rich color.','gloss2'),(3,'Pink Blush','lip-gloss',5.99,'Pink',10,'A soft pink gloss for a fresh look.','gloss3'),(4,'Purple Glow','lip-gloss',9.99,'Purple',3,'A vibrant purple gloss with shine.','gloss4'),(5,'Berry wine','lip-gloss',10.99,'Wine',8,'A deep berry gloss for a bold style.','gloss5'),(6,'Ruby shine','lip-gloss',5.99,'Ruby',18,'A bold red gloss with a smooth shine.','gloss6'),(7,'Natural','lashes',12.99,'Nat',10,'Light lashes for a natural look.','lashes1'),(8,'Soft','lashes',14.99,'Soft',10,'Wispy lashes','lashes2'),(9,'Glow','lashes',12.99,'Glow',10,'Volume lashes for a good look.','lashes3'),(10,'Night','lashes',14.99,'Night',10,'Full lashes for a bold eye look.','lashes4'),(11,'soft Brown Brow Tint','brows',18.99,'soft Brown',2,'Long-lasting brow tint for fuller brows.','brow1'),(12,'Medium Brown Brow Tint','brows',18.99,'Medium Brown',10,'Natural tint for soft defined brows.','brow2'),(13,'Dark Brown Brow Tint','brows',18.99,'Dark Brown',10,'Long-lasting brow tint for fuller brows.','brow3'),(14,'Black Brow Tint','brows',18.99,'Black',1,'Natural tint for soft defined brows.','brow4'),(15,'Everyday Nude Palette','palettes',24.99,'Nude',10,'Easy nude shades for daily makeup.','palette1'),(16,'Mid nude Palette','palettes',26.99,'Mid nude',10,'Bold colors for evening looks.','palette2'),(17,'Bold pigments Palette','palettes',24.99,'Pigments',10,'Easy nude shades for daily makeup.','palette3'),(18,'Bold Night Palette','palettes',26.99,'Dark',0,'Bold colors for evening looks.','palette4'),(19,'mermika','lip-gloss',9.99,'Brown',10,'Bold colors for evening looks.','gloss7'),(20,'Keke','lip-gloss',8.99,'Nude',0,'Bold colors for evening looks.','gloss8');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-05  3:43:30
