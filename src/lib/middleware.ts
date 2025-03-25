"server-only";
import type { CurrentUser } from "@/types/current-user";
import type { PagePermissions } from "@/types/middleware";
import { getUser } from "./getUser";

export type Page =
  | "home"
  | "dashboard"
  | "dashboard/analytics"
  | "profile"
  | "dynamic-page"
  | "dashboard/dynamic-page"
  | "pricing";
export type ExtraRole = "superadmin";

// Plugins
export type Plugins = {
  home: {};
  dashboard: {};
  profile: {
    canIViewOtherProfile: (currentUser: CurrentUser) => boolean;
  };
  "dashboard/analytics": {};
  "dynamic-page": {};
  "dashboard/dynamic-page": {};
  pricing: {};
};

// İzin Tanımları (Her sayfa kendi plugin'lerine sahip olabilir)
// Permission Definitions (Each page can have its own plugins)
export const pagePermissions: PagePermissions = {
  home: {
    allowedRoles: ["*"],
    canBannedUserView: true,
  },
  dashboard: {
    allowedRoles: ["admin", "superadmin"],
  },
  profile: {
    allowedRoles: ["user", "admin"],
    canIViewOtherProfile: (user) => {
      return user.role !== "visitor";
    },
  },
  "dynamic-page": {
    allowedRoles: ["*"],
  },
  "dashboard/analytics": {
    allowedRoles: ["admin", "superadmin"],
  },
  "dashboard/dynamic-page": {
    allowedRoles: ["admin", "superadmin"],
  },
  pricing: {
    allowedRoles: ["*"],
    canBannedUserView: false,
  },
};
export async function checkAccess<P extends Page>(page: P) {
  const currentUser = await getUser();
  const config = pagePermissions[page];

  if (!hasRequiredRole(config, currentUser)) return false;
  if (!canBannedUserAccess(config, currentUser)) return false;

  return handlePageSpecificLogic(page, config, currentUser);
}

function handlePageSpecificLogic<P extends Page>(
  page: P,
  config: PagePermissions[P],
  currentUser: CurrentUser
): boolean {
  switch (page) {
    case "home":
      const homeConfig = config as (typeof pagePermissions)["home"];
      break;
    case "profile": {
      const profileConfig = config as (typeof pagePermissions)["profile"];
      break;
    }
    case "dashboard": {
      const dashboardConfig = config as (typeof pagePermissions)["dashboard"];
      break;
    }
  }
  return true;
}

function hasRequiredRole<PP extends Page>(
  config: PagePermissions[PP],
  currentUser: CurrentUser
) {
  return (
    config.allowedRoles.includes("*") ||
    config.allowedRoles.includes(currentUser.role)
  );
}

function canBannedUserAccess<PP extends Page>(
  config: PagePermissions[PP],
  currentUser: CurrentUser
) {
  return !currentUser.banned || config.canBannedUserView === true;
}
