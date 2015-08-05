DROP TABLE IF EXISTS `blog_test_posts`;
CREATE TABLE `blog_test_posts` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Id',
	`title` VARCHAR(255) NOT NULL COMMENT 'Title',
	`description` TEXT NOT NULL COMMENT 'Description',
	`created` DATETIME NOT NULL COMMENT 'Created',
	PRIMARY KEY (`id`)
)
COMMENT='Posts table'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

DROP TABLE IF EXISTS `blog_test_users`;
CREATE TABLE `blog_test_users` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Id',
	`name` VARCHAR(50) NOT NULL COMMENT 'Name',
	`password` VARCHAR(100) NOT NULL COMMENT 'Password',
	`email` VARCHAR(255) NOT NULL COMMENT 'Email',
	PRIMARY KEY (`id`)
)
COMMENT='Users table'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;