-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Author" TEXT NOT NULL,
    "StreamCount" INTEGER NOT NULL DEFAULT 0,
    "photo" TEXT
);
INSERT INTO "new_Author" ("Author", "StreamCount", "id", "photo") SELECT "Author", "StreamCount", "id", "photo" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
PRAGMA foreign_key_check("Author");
PRAGMA foreign_keys=ON;
