-- CreateTable
CREATE TABLE "DynamicPageCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    CONSTRAINT "DynamicPageCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DynamicPageCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    "categoryId" TEXT,
    CONSTRAINT "DynamicPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DynamicPage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DynamicPageCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DynamicPage" ("content", "createdAt", "id", "imageUrl", "published", "slug", "title", "updatedAt", "userId") SELECT "content", "createdAt", "id", "imageUrl", "published", "slug", "title", "updatedAt", "userId" FROM "DynamicPage";
DROP TABLE "DynamicPage";
ALTER TABLE "new_DynamicPage" RENAME TO "DynamicPage";
CREATE UNIQUE INDEX "DynamicPage_slug_key" ON "DynamicPage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "DynamicPageCategory_name_key" ON "DynamicPageCategory"("name");
