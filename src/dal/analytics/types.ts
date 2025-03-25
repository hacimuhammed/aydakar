import { analyticService } from "./analytics";

export type GetMostVisitedPages = Awaited<
  ReturnType<typeof analyticService.getMostVisitedPages>
>;

export type GetMostUsedOperatingSystems = Awaited<
  ReturnType<typeof analyticService.getMostUsedOperatingSystems>
>;

export type GetMostUsedBrowsers = Awaited<
  ReturnType<typeof analyticService.getMostUsedBrowsers>
>;

export type GetMostUsedDevices = Awaited<
  ReturnType<typeof analyticService.getMostUsedDevices>
>;

export type GetMostReferrers = Awaited<
  ReturnType<typeof analyticService.getMostReferrers>
>;
