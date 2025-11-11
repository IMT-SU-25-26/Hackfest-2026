-- CreateTable
CREATE TABLE "Team" (
    "team_id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "proposal_url" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "Member" (
    "member_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("member_id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;
