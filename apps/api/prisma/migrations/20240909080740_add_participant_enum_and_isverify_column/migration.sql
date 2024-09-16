-- AlterTable
ALTER TABLE `user` ADD COLUMN `isVerify` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `role` ENUM('User', 'Participant', 'Organizer') NOT NULL DEFAULT 'Participant';
