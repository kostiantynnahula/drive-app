/*
  Warnings:

  - You are about to drop the column `userId` on the `ResetPassword` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `ResetPassword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetPassword" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_email_key" ON "ResetPassword"("email");
