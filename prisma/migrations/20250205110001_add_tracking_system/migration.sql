-- CreateTable
CREATE TABLE "Tracking" (
    "trackingId" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT,
    "userAgent" TEXT,
    "isBot" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "lastSeen" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trackingId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "PageView_trackingId_fkey" FOREIGN KEY ("trackingId") REFERENCES "Tracking" ("trackingId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trackingId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventData" JSONB,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "Event_trackingId_fkey" FOREIGN KEY ("trackingId") REFERENCES "Tracking" ("trackingId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tracking_trackingId_key" ON "Tracking"("trackingId");
