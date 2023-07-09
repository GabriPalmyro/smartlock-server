/*
  Warnings:

  - You are about to drop the column `teacher_code` on the `User` table. All the data in the column will be lost.
  - Added the required column `code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "teacher_code",
ADD COLUMN     "code" TEXT NOT NULL;
