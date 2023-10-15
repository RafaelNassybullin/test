/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "userID" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oldimage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "oldname" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "History_userID_key" ON "History"("userID");
