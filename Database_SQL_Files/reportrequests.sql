DROP TABLE IF EXISTS `report_requests`;
CREATE TABLE `report_requests` (
	`post_id` int NOT NULL,
	`requestDate` varchar(255) DEFAULT NULL,
	`email` varchar(255) DEFAULT NULL,
	`name` varchar(255) DEFAULT NULL,
	`originalTitle` varchar(255) DEFAULT NULL,
	`originalMessage` varchar(255) DEFAULT NULL,
	`status` varchar(255) DEFAULT NULL,
    
	PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;