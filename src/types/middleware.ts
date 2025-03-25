import { Page, Plugins, ExtraRole } from "@/lib/middleware";

export type Role = ExtraRole | "*" | "visitor" | "user" | "admin";

// 1. Temel Sayfa Konfigürasyon Tipi
export type BasePageConfig = {
  allowedRoles: Role[];
  canBannedUserView?: boolean;
  pathname?: string;
  customCheck?: (
    currentUser: { id: string; role: Role },
    context?: unknown
  ) => boolean;
};

// 3. Sayfa Konfigürasyonu (Her sayfa kendi plugin'lerini alır)
export type PageConfigWithPlugins<P extends keyof Plugins> = BasePageConfig &
  Plugins[P];

// 4. Tüm Sayfaların Konfigürasyon Tipi
export type PagePermissions = {
  [P in Page]: PageConfigWithPlugins<P & keyof Plugins>;
};
