/*
  Warnings:

  - You are about to drop the `psikologjobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatmentsession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `psikolog_additional_data` DROP FOREIGN KEY `psikolog_additional_data_current_job_id_fkey`;

-- DropForeignKey
ALTER TABLE `treatmentsession` DROP FOREIGN KEY `TreatmentSession_userId_fkey`;

-- DropTable
DROP TABLE `psikologjobs`;

-- DropTable
DROP TABLE `treatmentsession`;

-- CreateTable
CREATE TABLE `psikolog_job` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treatment_session` (
    `id` VARCHAR(191) NOT NULL,
    `psikolog_id` VARCHAR(191) NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,

    INDEX `idx_psikolog_id`(`psikolog_id`),
    INDEX `idx_client_id`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `psikolog_additional_data` ADD CONSTRAINT `psikolog_additional_data_current_job_id_fkey` FOREIGN KEY (`current_job_id`) REFERENCES `psikolog_job`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treatment_session` ADD CONSTRAINT `treatment_session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
