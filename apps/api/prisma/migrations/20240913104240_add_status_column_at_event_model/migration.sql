-- AlterTable
ALTER TABLE `event` ADD COLUMN `eventStatus` ENUM('Active', 'Pending', 'Inactive') NOT NULL DEFAULT 'Inactive';
