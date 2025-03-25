/*
  Warnings:

  - Added the required column `trackingId` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "producerUrl" TEXT NOT NULL,
    "producerIcon" TEXT,
    "trackingId" TEXT NOT NULL,
    CONSTRAINT "Bot_trackingId_fkey" FOREIGN KEY ("trackingId") REFERENCES "Tracking" ("trackingId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bot" ("category", "id", "name", "producerIcon", "producerName", "producerUrl") SELECT "category", "id", "name", "producerIcon", "producerName", "producerUrl" FROM "Bot";
DROP TABLE "Bot";
ALTER TABLE "new_Bot" RENAME TO "Bot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
