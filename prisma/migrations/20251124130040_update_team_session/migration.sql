-- AlterTable
ALTER TABLE "TeamSession" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "TeamSession_team_id_idx" ON "TeamSession"("team_id");
