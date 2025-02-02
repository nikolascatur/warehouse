/*
  Warnings:

  - Added the required column `price_item` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_total` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `price_item` INTEGER NOT NULL,
    ADD COLUMN `price_total` INTEGER NOT NULL;
