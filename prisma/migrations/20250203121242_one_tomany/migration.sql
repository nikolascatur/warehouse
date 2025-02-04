/*
  Warnings:

  - You are about to drop the column `order_detail_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_order_detail_id_fkey`;

-- DropIndex
DROP INDEX `Order_order_detail_id_fkey` ON `Order`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `order_detail_id`;

-- AlterTable
ALTER TABLE `OrderDetail` ADD COLUMN `order_id` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
