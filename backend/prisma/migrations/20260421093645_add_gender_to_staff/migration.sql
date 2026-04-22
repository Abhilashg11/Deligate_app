/*
  Warnings:

  - Added the required column `gender` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "gender" TEXT NOT NULL;
