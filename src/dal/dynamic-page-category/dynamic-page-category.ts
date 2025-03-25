import prisma from "@/lib/db";

export type GetNavbarCategoriesWithPages = Awaited<
  ReturnType<typeof dynamicPageCategoryService.getNavbarCategoriesWithPages>
>;

export type GetTopLevelParentCategories = Awaited<
  ReturnType<typeof dynamicPageCategoryService.getTopLevelParentCategories>
>;

class DynamicPageCategoryService {
  public async getNavbarCategoriesWithPages() {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      orderBy: {
        order: "asc",
      },
      take: 6,
      select: {
        id: true,
        name: true,
        pages: {
          where: {
            published: true,
          },
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            subcategories: true,
          },
        },
      },
    });
    return categories;
  }
  public async getTopLevelParentCategories() {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    });
    return categories;
  }
}
export const dynamicPageCategoryService = new DynamicPageCategoryService();
