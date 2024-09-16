/*
  Warnings:

  - A unique constraint covering the columns `[referallcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referallinput]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_referallcode_key` ON `User`(`referallcode`);

-- CreateIndex
CREATE UNIQUE INDEX `User_referallinput_key` ON `User`(`referallinput`);
