/*
  Warnings:

  - You are about to drop the `goods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_goods_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_transaction_id_fkey`;

-- DropTable
DROP TABLE `goods`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `transaction`;

-- CreateTable
CREATE TABLE `Goods` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `sell_price` INTEGER NOT NULL,
    `discount` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `barcode` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buyer` (
    `id` VARCHAR(191) NOT NULL,
    `buyer_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teller` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `access_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Teller_access_id_key`(`access_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Access` (
    `id` VARCHAR(191) NOT NULL,
    `access_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NOT NULL,
    `payment_status` VARCHAR(50) NOT NULL,
    `order_detail_id` VARCHAR(100) NOT NULL,
    `buyer_id` VARCHAR(100) NOT NULL,
    `buyer_name` VARCHAR(100) NOT NULL,
    `teller_id` VARCHAR(100) NOT NULL,
    `teller_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetail` (
    `id` VARCHAR(191) NOT NULL,
    `goods_id` VARCHAR(100) NOT NULL,
    `goods_name` VARCHAR(100) NOT NULL,
    `goods_count` INTEGER NOT NULL,
    `goods_price` BIGINT NOT NULL,
    `total_goods_price` BIGINT NOT NULL,
    `discount` INTEGER NOT NULL,
    `barcode` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teller` ADD CONSTRAINT `Teller_access_id_fkey` FOREIGN KEY (`access_id`) REFERENCES `Access`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_order_detail_id_fkey` FOREIGN KEY (`order_detail_id`) REFERENCES `OrderDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
