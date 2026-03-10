/*
  Warnings:

  - You are about to drop the column `weight_cm` on the `body_measurements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "weight_cm",
ADD COLUMN     "weight_kg" INTEGER;
