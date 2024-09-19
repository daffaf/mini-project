/*
  Warnings:

  - You are about to drop the column `eventTime` on the `event` table. All the data in the column will be lost.
  - Added the required column `eventEnd` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventStart` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `eventTime`,
    ADD COLUMN `eventEnd` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventStart` VARCHAR(191) NOT NULL;
