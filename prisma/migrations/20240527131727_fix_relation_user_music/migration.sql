-- CreateTable
CREATE TABLE "_userMusic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_userMusic_A_fkey" FOREIGN KEY ("A") REFERENCES "Music" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_userMusic_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_userMusic_AB_unique" ON "_userMusic"("A", "B");

-- CreateIndex
CREATE INDEX "_userMusic_B_index" ON "_userMusic"("B");
