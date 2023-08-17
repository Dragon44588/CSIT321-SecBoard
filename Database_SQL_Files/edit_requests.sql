/*
 Navicat MySQL Data Transfer

 Source Server         : yuyuziMusic
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : 321DB

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 11/08/2023 10:47:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for edit_requests
-- ----------------------------
DROP TABLE IF EXISTS `edit_requests`;
CREATE TABLE `edit_requests` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `requestDate` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `originTitle` varchar(255) DEFAULT NULL,
  `originMessage` varchar(255) DEFAULT NULL,
  `newTitle` varchar(255) DEFAULT NULL,
  `newMessage` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;