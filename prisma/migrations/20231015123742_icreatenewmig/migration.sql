/*
  Warnings:

  - You are about to drop the column `oldimage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `oldname` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_userID_fkey";

-- DropIndex
DROP INDEX "History_userID_key";

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "newimage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "newname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "oldimage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "oldname" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "userID" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "oldimage",
DROP COLUMN "oldname";
