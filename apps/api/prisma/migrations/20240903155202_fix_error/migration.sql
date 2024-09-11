/*
  Warnings:

  - Added the required column `maxUsed` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `voucher` ADD COLUMN `maxUsed` INTEGER NOT NULL,
    ADD COLUMN `totalUsed` INTEGER NOT NULL DEFAULT 0;
