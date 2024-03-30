/*
  Warnings:

  - Added the required column `description` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Password" ADD COLUMN     "description" TEXT NOT NULL;
