/*
  Warnings:

  - You are about to drop the column `description` on the `DynamicPage` table. All the data in the column will be lost.
  - Added the required column `content` to the `DynamicPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `DynamicPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DynamicPage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DynamicPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DynamicPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DynamicPage" ("createdAt", "id", "imageUrl", "title", "updatedAt") SELECT "createdAt", "id", "imageUrl", "title", "updatedAt" FROM "DynamicPage";
DROP TABLE "DynamicPage";
ALTER TABLE "new_DynamicPage" RENAME TO "DynamicPage";
CREATE UNIQUE INDEX "DynamicPage_slug_key" ON "DynamicPage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
