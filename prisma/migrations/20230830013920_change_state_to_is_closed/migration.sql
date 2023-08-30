/*
  Warnings:

  - You are about to drop the column `state` on the `Lock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lock" DROP COLUMN "state",
ADD COLUMN     "isClosed" BOOLEAN NOT NULL DEFAULT true;
