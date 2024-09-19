/*
  Warnings:

  - Added the required column `discount` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `voucher` ADD COLUMN `discount` INTEGER NOT NULL;
