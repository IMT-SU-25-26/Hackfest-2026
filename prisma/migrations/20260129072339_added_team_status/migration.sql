/*
  Warnings:

  - You are about to drop the column `university` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TeamStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "status" "TeamStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "university",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "id_card" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "major" TEXT,
ADD COLUMN     "studentId" TEXT;
