/*
  Warnings:

  - You are about to drop the column `referallcode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referallinput` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referall_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referall_input]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_referallcode_key` ON `user`;

-- DropIndex
DROP INDEX `User_referallinput_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `referallcode`,
    DROP COLUMN `referallinput`,
    ADD COLUMN `referall_code` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `referall_input` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_referall_code_key` ON `User`(`referall_code`);

-- CreateIndex
CREATE UNIQUE INDEX `User_referall_input_key` ON `User`(`referall_input`);
