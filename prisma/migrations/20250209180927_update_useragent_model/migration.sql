/*
  Warnings:

  - You are about to drop the column `browser` on the `UserAgent` table. All the data in the column will be lost.
  - You are about to drop the column `browserVersion` on the `UserAgent` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserAgent` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `UserAgent` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `UserAgent` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAgent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientType" TEXT NOT NULL DEFAULT 'unknown',
    "clientName" TEXT NOT NULL DEFAULT 'unknown',
    "clientVersion" TEXT NOT NULL DEFAULT 'unknown',
    "engine" TEXT NOT NULL DEFAULT 'unknown',
    "engineVersion" TEXT NOT NULL DEFAULT 'unknown',
    "osName" TEXT NOT NULL DEFAULT 'unknown',
    "osVersion" TEXT NOT NULL DEFAULT 'unknown',
    "osPlatform" TEXT NOT NULL DEFAULT 'unknown',
    "deviceType" TEXT NOT NULL DEFAULT 'unknown',
    "deviceBrand" TEXT NOT NULL DEFAULT 'unknown',
    "deviceModel" TEXT NOT NULL DEFAULT 'unknown',
    "trackingId" TEXT NOT NULL,
    CONSTRAINT "UserAgent_trackingId_fkey" FOREIGN KEY ("trackingId") REFERENCES "Tracking" ("trackingId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserAgent" ("id", "osVersion", "trackingId") SELECT "id", "osVersion", "trackingId" FROM "UserAgent";
DROP TABLE "UserAgent";
ALTER TABLE "new_UserAgent" RENAME TO "UserAgent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
