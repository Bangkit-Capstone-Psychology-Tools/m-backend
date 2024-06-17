/*
  Warnings:

  - Made the column `birthday` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `birthday` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `class` INTEGER NOT NULL;
