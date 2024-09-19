/*
  Warnings:

  - You are about to drop the column `event_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `voucher_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `organizer_img` on the `organizer` table. All the data in the column will be lost.
  - You are about to drop the column `organizer_name` on the `organizer` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `organizer` table. All the data in the column will be lost.
  - You are about to drop the column `referall_code` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referall_input` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referall_used` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_img` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `point_expired` on the `wallet` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `wallet` table. All the data in the column will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voucherId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizerName]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referallCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referallInput]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerName` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointExpired` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_event_id_key` ON `order`;

-- DropIndex
DROP INDEX `Order_voucher_id_key` ON `order`;

-- DropIndex
DROP INDEX `Organizer_organizer_name_key` ON `organizer`;

-- DropIndex
DROP INDEX `Organizer_user_id_key` ON `organizer`;

-- DropIndex
DROP INDEX `User_referall_code_key` ON `user`;

-- DropIndex
DROP INDEX `User_referall_input_key` ON `user`;

-- DropIndex
DROP INDEX `Wallet_user_id_key` ON `wallet`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `event_id`,
    DROP COLUMN `user_id`,
    DROP COLUMN `voucher_id`,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `voucherId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `organizer` DROP COLUMN `organizer_img`,
    DROP COLUMN `organizer_name`,
    DROP COLUMN `user_id`,
    ADD COLUMN `organizerImg` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `organizerName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `referall_code`,
    DROP COLUMN `referall_input`,
    DROP COLUMN `referall_used`,
    DROP COLUMN `user_img`,
    ADD COLUMN `referallCode` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `referallInput` VARCHAR(191) NULL,
    ADD COLUMN `referallUsed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userImg` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `wallet` DROP COLUMN `point_expired`,
    DROP COLUMN `user_id`,
    ADD COLUMN `pointExpired` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `event`;

-- CreateIndex
CREATE UNIQUE INDEX `Order_eventId_key` ON `Order`(`eventId`);

-- CreateIndex
CREATE UNIQUE INDEX `Order_voucherId_key` ON `Order`(`voucherId`);

-- CreateIndex
CREATE UNIQUE INDEX `Organizer_userId_key` ON `Organizer`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Organizer_organizerName_key` ON `Organizer`(`organizerName`);

-- CreateIndex
CREATE UNIQUE INDEX `User_referallCode_key` ON `User`(`referallCode`);

-- CreateIndex
CREATE UNIQUE INDEX `User_referallInput_key` ON `User`(`referallInput`);

-- CreateIndex
CREATE UNIQUE INDEX `Wallet_userId_key` ON `Wallet`(`userId`);
