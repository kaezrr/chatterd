/*
  Warnings:

  - The primary key for the `Friend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Friend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Friend_pkey" PRIMARY KEY ("userId");
