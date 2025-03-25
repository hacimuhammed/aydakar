"server-only";
import { analyticService } from "./analytics/analytics";
import { dynamicPageCategoryService } from "./dynamic-page-category/dynamic-page-category";
import { dynamicPageService } from "./dynamic-page/dynamic-page";
import { accountService } from "./account/account";
export const services = {
  account: accountService,
  analytic: analyticService,
  dynamicPage: dynamicPageService,
  dynamicPageCategory: dynamicPageCategoryService,
};

export type Services = typeof services;
