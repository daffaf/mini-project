-- AddForeignKey
ALTER TABLE `Organizer` ADD CONSTRAINT `Organizer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
