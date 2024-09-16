-- AlterTable
ALTER TABLE `wallet` MODIFY `pointExpired` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
