-- CreateTable
CREATE TABLE "UserMusic" (
    "userId" INTEGER NOT NULL,
    "musicId" INTEGER NOT NULL,
    CONSTRAINT "UserMusic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMusic_userId_key" ON "UserMusic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMusic_musicId_key" ON "UserMusic"("musicId");
