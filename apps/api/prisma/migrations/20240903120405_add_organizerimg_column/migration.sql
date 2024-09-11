/*
  Warnings:

  - Added the required column `organizer_img` to the `Organizer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organizer` ADD COLUMN `organizer_img` VARCHAR(191) NOT NULL;
