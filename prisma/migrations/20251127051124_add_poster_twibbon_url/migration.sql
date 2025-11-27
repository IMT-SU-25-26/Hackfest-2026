/*
  Warnings:

  - Added the required column `poster_url` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twibbon_url` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "poster_url" TEXT NOT NULL,
ADD COLUMN     "twibbon_url" TEXT NOT NULL;
