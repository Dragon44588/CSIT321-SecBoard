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

 Date: 11/08/2023 10:48:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `deleted` int DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `content_hash` varchar(255) DEFAULT NULL,
  `timestamp` date DEFAULT NULL,
  `background_color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `posts` AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;
