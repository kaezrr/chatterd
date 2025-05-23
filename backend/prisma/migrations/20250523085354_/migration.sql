/*
  Warnings:

  - You are about to drop the column `user1Id` on the `FriendShip` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `FriendShip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromId,toId]` on the table `FriendShip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fromId` to the `FriendShip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `FriendShip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendShip" DROP CONSTRAINT "FriendShip_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "FriendShip" DROP CONSTRAINT "FriendShip_user2Id_fkey";

-- DropIndex
DROP INDEX "FriendShip_user1Id_user2Id_key";

-- AlterTable
ALTER TABLE "FriendShip" DROP COLUMN "user1Id",
DROP COLUMN "user2Id",
ADD COLUMN     "fromId" INTEGER NOT NULL,
ADD COLUMN     "toId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FriendShip_fromId_toId_key" ON "FriendShip"("fromId", "toId");

-- AddForeignKey
ALTER TABLE "FriendShip" ADD CONSTRAINT "FriendShip_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendShip" ADD CONSTRAINT "FriendShip_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
