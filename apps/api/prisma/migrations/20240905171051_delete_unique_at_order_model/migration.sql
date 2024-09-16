-- DropIndex
DROP INDEX `Order_eventId_key` ON `order`;

-- DropIndex
DROP INDEX `Order_voucherId_key` ON `order`;

-- AlterTable
ALTER TABLE `order` MODIFY `voucherId` INTEGER NULL;
