/*
  Warnings:

  - You are about to drop the column `role2` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role2`,
    MODIFY `role` ENUM('User', 'Organizer') NOT NULL DEFAULT 'User';
