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

 Date: 11/08/2023 10:48:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Votes
-- ----------------------------
DROP TABLE IF EXISTS `Votes`;
CREATE TABLE `Votes` (
  `post_id` int DEFAULT NULL,
  `request_type` enum('Delete','Edit') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `vote_yes_or_no` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
