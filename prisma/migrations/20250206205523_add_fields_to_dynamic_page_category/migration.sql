/*
  Warnings:

  - Added the required column `slug` to the `DynamicPageCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DynamicPageCategory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DynamicPageCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "parentId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "DynamicPageCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DynamicPageCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DynamicPageCategory" ("id", "name", "parentId") SELECT "id", "name", "parentId" FROM "DynamicPageCategory";
DROP TABLE "DynamicPageCategory";
ALTER TABLE "new_DynamicPageCategory" RENAME TO "DynamicPageCategory";
CREATE UNIQUE INDEX "DynamicPageCategory_name_key" ON "DynamicPageCategory"("name");
CREATE UNIQUE INDEX "DynamicPageCategory_slug_key" ON "DynamicPageCategory"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
