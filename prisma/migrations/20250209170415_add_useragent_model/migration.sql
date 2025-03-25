-- CreateTable
CREATE TABLE "UserAgent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "browser" TEXT NOT NULL,
    "browserVersion" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "osVersion" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trackingId" TEXT NOT NULL,
    CONSTRAINT "UserAgent_trackingId_fkey" FOREIGN KEY ("trackingId") REFERENCES "Tracking" ("trackingId") ON DELETE RESTRICT ON UPDATE CASCADE
);
