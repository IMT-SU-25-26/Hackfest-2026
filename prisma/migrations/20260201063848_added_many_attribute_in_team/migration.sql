-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "isFinalist" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "submission_figma_url" TEXT,
ADD COLUMN     "submission_gdrive_url" TEXT,
ADD COLUMN     "submission_github_url" TEXT,
ADD COLUMN     "submission_lean_canvas_url" TEXT,
ADD COLUMN     "submission_originality_url" TEXT,
ADD COLUMN     "submission_ppt_url" TEXT,
ADD COLUMN     "submission_proposal_url" TEXT,
ADD COLUMN     "submission_video_demo_url" TEXT,
ADD COLUMN     "surat_tugas_url" TEXT;
