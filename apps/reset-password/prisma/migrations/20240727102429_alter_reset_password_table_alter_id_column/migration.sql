/*
  Warnings:

  - The primary key for the `ResetPassword` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id");
