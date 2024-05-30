/*
  Warnings:

  - You are about to drop the column `size` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Feature` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "size",
DROP COLUMN "type";
