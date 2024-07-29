-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('EXTREEM', 'RECOVERY', 'TRAINEE');

-- CreateTable
CREATE TABLE "LessonsOptions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "lessonType" "LessonType" NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonsOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LessonsOptions" ADD CONSTRAINT "LessonsOptions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
