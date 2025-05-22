/*
  Warnings:

  - The primary key for the `FriendRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id", "fromId", "toId");
