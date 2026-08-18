DROP INDEX `entrance_exams_status_idx` ON `entrance_exams`;--> statement-breakpoint
ALTER TABLE `colleges` MODIFY COLUMN `naacGrade` varchar(50);--> statement-breakpoint
ALTER TABLE `entrance_exams` ADD `status` enum('open','upcoming','closed') NOT NULL;--> statement-breakpoint
CREATE INDEX `entrance_exams_status_idx` ON `entrance_exams` (`status`);--> statement-breakpoint
ALTER TABLE `entrance_exams` DROP COLUMN `exam_status`;