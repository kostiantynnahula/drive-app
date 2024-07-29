/*
  Warnings:

  - You are about to drop the `LessonsOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LessonsOptions" DROP CONSTRAINT "LessonsOptions_organizationId_fkey";

-- DropTable
DROP TABLE "LessonsOptions";

-- CreateTable
CREATE TABLE "LessonsOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "lessonType" "LessonType" NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonsOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LessonsOption" ADD CONSTRAINT "LessonsOption_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
