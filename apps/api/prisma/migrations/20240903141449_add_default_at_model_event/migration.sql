-- AlterTable
ALTER TABLE `event` MODIFY `event_img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `organizer` MODIFY `organizer_img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'User',
    MODIFY `referallinput` VARCHAR(191) NULL,
    MODIFY `user_img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `wallet` MODIFY `saldo` INTEGER NOT NULL DEFAULT 0,
    MODIFY `point` INTEGER NOT NULL DEFAULT 0;
