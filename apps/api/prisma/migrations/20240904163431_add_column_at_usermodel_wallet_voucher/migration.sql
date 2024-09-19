/*
  Warnings:

  - You are about to drop the column `eventCategory` on the `event` table. All the data in the column will be lost.
  - Added the required column `eventCategoryId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `couponId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `eventCategory`,
    ADD COLUMN `eventCategoryId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `couponId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,
    `expiredCode` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Coupon_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EventCategory_categoryName_key`(`categoryName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Coupon` ADD CONSTRAINT `Coupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_eventCategoryId_fkey` FOREIGN KEY (`eventCategoryId`) REFERENCES `EventCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
