/*
  Warnings:

  - Added the required column `atendiment` to the `schedulings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedulings` ADD COLUMN `atendiment` VARCHAR(191) NOT NULL,
    ADD COLUMN `room` VARCHAR(191) NOT NULL;
