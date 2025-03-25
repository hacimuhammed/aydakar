"server-only";

import prisma from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { checkAccess } from "@/lib/middleware";
import { forbidden } from "next/navigation";
import DeviceDetector from "device-detector-js";
type CreateTrackingWithPageViewParams = {
  trackingId: string;
  ip: string;
  userAgent: string;
  path: string;
  referer: string;
};

type CreateTrackingEventParams = {
  trackingId: string;
  eventName: string;
  eventData?: object;
};

const analyticsDays = [7, 14, 30, 90, 180, 365];

class AnaltyicService {
  async getAnalytics(day: number) {
    const canAccess = await checkAccess("dashboard/analytics");
    if (!canAccess) {
      forbidden();
    }
    const validDay = analyticsDays.includes(Number(day)) ? Number(day) : 7;

    return {
      mostUsedBrowsers: await this.getMostUsedBrowsers(validDay),
      mostUsedOperatingSystems: await this.getMostUsedOperatingSystems(
        validDay
      ),
      mostUsedDevices: await this.getMostUsedDevices(validDay),
      mostVisitedPages: await this.getMostVisitedPages(validDay),
      mostReferrers: await this.getMostReferrers(validDay),
    };
  }

  async createTrackingWithPageView({
    ip,
    path,
    referer,
    trackingId,
    userAgent,
  }: CreateTrackingWithPageViewParams) {
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);

    const bot = device.bot;
    const tracking = await prisma.tracking.upsert({
      where: { trackingId: trackingId },
      create: {
        trackingId,
        ip,
        userAgent,
        isBot: bot ? true : false,
        createdAt: new Date(),
        lastSeen: new Date(),
      },
      update: { lastSeen: new Date() },
    });

    if (bot) {
      const createdBot = await prisma.bot.create({
        data: {
          trackingId,
          name: bot.name,
          category: bot.category,
          producerName: bot.producer.name,
          producerUrl: bot.producer.url,
        },
      });
    } else {
      await prisma.userAgent.create({
        data: {
          trackingId,
          clientType: device.client?.type,
          clientName: device.client?.name,
          clientVersion: device.client?.version,
          osName: device.os?.name,
          osVersion: device.os?.version,
          osPlatform: device.os?.platform,
        },
      });
    }

    await prisma.pageView.create({
      data: {
        trackingId,
        path,
        referrer: referer,
        createdAt: new Date(),
      },
    });
  }

  async createTrackingEvent({
    eventName,
    trackingId,
    eventData,
  }: CreateTrackingEventParams) {
    await prisma.event.create({
      data: {
        trackingId,
        eventName,
        eventData,
        createdAt: new Date(),
      },
    });
  }

  async getMostVisitedPages(day: number) {
    const startDate = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
    const endDate = new Date();

    const pages = await prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 6,
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return pages;
  }
  async getMostUsedOperatingSystems(day: number) {
    const startDate = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
    const endDate = new Date();
    const operatingSystems = await prisma.userAgent.groupBy({
      by: ["osName"],
      _count: { osName: true },
      orderBy: { _count: { osName: "desc" } },
      take: 6,
      where: {
        tracking: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    });
    return operatingSystems;
  }
  async getMostUsedBrowsers(day: number) {
    const startDate = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
    const endDate = new Date();
    const browsers = await prisma.userAgent.groupBy({
      by: ["clientName"],
      _count: { clientName: true },
      orderBy: { _count: { clientName: "desc" } },
      take: 6,
      where: {
        tracking: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    });
    return browsers;
  }
  async getMostUsedDevices(day: number) {
    const startDate = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
    const endDate = new Date();
    const devices = await prisma.userAgent.groupBy({
      by: ["clientType"],
      _count: { clientType: true },
      orderBy: { _count: { clientType: "desc" } },
      take: 6,
      where: {
        tracking: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    });
    return devices;
  }
  async getMostReferrers(day: number) {
    const startDate = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
    const endDate = new Date();
    const referrers = await prisma.pageView.groupBy({
      by: ["referrer"],
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 6,
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return referrers;
  }
}

export const analyticService = new AnaltyicService();
