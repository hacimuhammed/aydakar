"server-only";
import prisma from "@/lib/db";
import { checkAccess } from "@/lib/middleware";
import { forbidden } from "next/navigation";

class DynamicPageService {
  async getDynamicPages() {
    const canAccess = await checkAccess("dashboard");
    if (!canAccess) forbidden();

    const dynamicPages = await prisma.dynamicPage.findMany({
      select: {
        slug: true,
        title: true,
        content: true,
        imageUrl: true,
      },
      where: {
        published: true,
      },
    });
    return dynamicPages;
  }

  async getDynamicPageBySlug(slug: string) {
    const canAccess = await checkAccess("dynamic-page");
    if (!canAccess) return forbidden();

    const dynamicPage = await prisma.dynamicPage.findUnique({
      where: { slug, published: true },
      select: {
        slug: true,
        title: true,
        content: true,
        imageUrl: true,
      },
    });
    return dynamicPage;
  }
}

export const dynamicPageService = new DynamicPageService();
