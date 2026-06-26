/*
  Warnings:

  - Added the required column `userId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Document` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "Document_userId_idx" ON "Document"("userId");

-- CreateIndex
CREATE INDEX "Document_userId_updatedAt_idx" ON "Document"("userId", "updatedAt");
