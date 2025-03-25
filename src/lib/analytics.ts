// lib/analytics.ts

import { headers } from "next/headers";
import { isbot } from "isbot";
import prisma from "./db";
import { services } from "@/dal/services";

export async function trackPageView() {
  const headersList = await headers();
  const trackingId = headersList.get("x-tracking-id")!;
  const userAgent = headersList.get("user-agent") || "";
  const isBot = isbot(userAgent);
  const ip = headersList.get("x-ip") || "unknown";
  const path = headersList.get("x-path") || "unknown";
  const referer = headersList.get("referer") || "direct";

  if (isBot) return;

  services.analytic.createTrackingWithPageView({
    trackingId,
    ip,
    userAgent,
    path,
    referer,
  });
}

export async function trackEvent(eventName: string, eventData?: object) {
  const headersList = await headers();
  const trackingId = headersList.get("x-tracking-id")!;
  if (!trackingId) return;

  await prisma.event.create({
    data: {
      trackingId,
      eventName,
      eventData,
      createdAt: new Date(),
    },
  });
}
