/*
  Warnings:

  - You are about to drop the column `cnpj` on the `agencies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `service_points` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `service_points` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `agencies.cnpj_unique` ON `agencies`;

-- AlterTable
ALTER TABLE `agencies` DROP COLUMN `cnpj`;

-- AlterTable
ALTER TABLE `service_points` ADD COLUMN `cnpj` VARCHAR(14) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `service_points.cnpj_unique` ON `service_points`(`cnpj`);
