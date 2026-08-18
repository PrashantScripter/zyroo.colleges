CREATE TABLE `assessment_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`collegeId` int NOT NULL,
	`text` text NOT NULL,
	`options` json NOT NULL,
	`correctOptionIndex` int NOT NULL,
	`explanation` text NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `assessment_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`content` text,
	`image` text NOT NULL,
	`category` varchar(255) NOT NULL,
	`author` varchar(255) NOT NULL,
	`authorType` varchar(255) NOT NULL,
	`tags` json NOT NULL,
	`likes` int NOT NULL DEFAULT 0,
	`views` int NOT NULL DEFAULT 0,
	`publishedAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `colleges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`stream` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`nirfRank` int NOT NULL,
	`naacGrade` varchar(50),
	`annualFees` float NOT NULL,
	`rating` float NOT NULL DEFAULT 0,
	`image` text NOT NULL,
	`established` int,
	`campusSize` float,
	`phdFacultyPct` float,
	`ratingAcademics` float DEFAULT 0,
	`ratingPlacements` float DEFAULT 0,
	`ratingInfrastructure` float DEFAULT 0,
	`ratingCampusLife` float DEFAULT 0,
	`facilities` json,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `colleges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `counseling_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(255) NOT NULL,
	`targetCollege` varchar(255) NOT NULL,
	`stream` varchar(255) NOT NULL,
	`preferredDate` datetime NOT NULL,
	`preferredTime` varchar(50) NOT NULL,
	`concerns` text,
	`userId` varchar(36),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `counseling_bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`collegeId` int NOT NULL,
	`key` varchar(50) NOT NULL,
	`name` varchar(255) NOT NULL,
	`fees` float NOT NULL,
	`hostelFees` float NOT NULL,
	`avgPackage` float NOT NULL,
	`medianPackage` float NOT NULL,
	`highestPackage` float NOT NULL,
	`placementRate` float NOT NULL,
	`cutoff` varchar(255) NOT NULL,
	`acceptedExams` varchar(255) NOT NULL,
	`duration` varchar(50) NOT NULL,
	`seats` int NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `entrance_exams` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`stream` varchar(255) NOT NULL,
	`conductingBody` varchar(255) NOT NULL,
	`mode` varchar(50) NOT NULL,
	`status` enum('open','upcoming','closed') NOT NULL,
	`registrationTimeline` varchar(255) NOT NULL,
	`examDatesTimeline` varchar(255) NOT NULL,
	`eligibility` text NOT NULL,
	`targetColleges` text NOT NULL,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `entrance_exams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(36) NOT NULL DEFAULT (uuid()),
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255),
	`role` enum('STUDENT','COUNSELOR','PARENT','COLLEGE_REP') DEFAULT 'STUDENT',
	`picture` text,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`),
	CONSTRAINT `User_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `assessment_questions_collegeId_idx` ON `assessment_questions` (`collegeId`);--> statement-breakpoint
CREATE INDEX `blogs_category_idx` ON `blogs` (`category`);--> statement-breakpoint
CREATE INDEX `blogs_publishedAt_idx` ON `blogs` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `blogs_author_idx` ON `blogs` (`author`);--> statement-breakpoint
CREATE INDEX `colleges_stream_idx` ON `colleges` (`stream`);--> statement-breakpoint
CREATE INDEX `colleges_category_idx` ON `colleges` (`category`);--> statement-breakpoint
CREATE INDEX `colleges_nirfRank_idx` ON `colleges` (`nirfRank`);--> statement-breakpoint
CREATE INDEX `counseling_bookings_email_idx` ON `counseling_bookings` (`email`);--> statement-breakpoint
CREATE INDEX `counseling_bookings_createdAt_idx` ON `counseling_bookings` (`createdAt`);--> statement-breakpoint
CREATE INDEX `courses_collegeId_idx` ON `courses` (`collegeId`);--> statement-breakpoint
CREATE INDEX `courses_key_idx` ON `courses` (`key`);--> statement-breakpoint
CREATE INDEX `entrance_exams_stream_idx` ON `entrance_exams` (`stream`);--> statement-breakpoint
CREATE INDEX `entrance_exams_status_idx` ON `entrance_exams` (`status`);