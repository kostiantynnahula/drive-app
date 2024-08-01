/*
  Warnings:

  - Added the required column `locationId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Made the column `organizationId` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('AUTOMATIC', 'MANUAL');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "transmission" "TransmissionType" NOT NULL,
ALTER COLUMN "organizationId" SET NOT NULL;
