/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `psikologi_tools` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `psikologi_tools_path_key` ON `psikologi_tools`(`path`);
