-- CreateTable
CREATE TABLE "TeamSession" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamSession_sessionToken_key" ON "TeamSession"("sessionToken");

-- AddForeignKey
ALTER TABLE "TeamSession" ADD CONSTRAINT "TeamSession_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;
