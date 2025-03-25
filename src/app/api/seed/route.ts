import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(): Promise<Response> {
  try {
    const users = await prisma.user.findMany();

    if (users.length > 0) {
      return new Response(
        JSON.stringify({ message: "Seed data already exists" }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userId = (
      await auth.api.signUpEmail({
        body: {
          name: "Aydakar Admin",
          email: "admin@aydakar.com",
          password: "aydakar12345",
        },
      })
    ).user.id;
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "admin",
      },
    });

    const categoryCorp = await prisma.category.create({
      data: {
        name: "Kurumsal",
        slug: "kurumsal",
        active: true,
      },
    });

    const categoryBlog = await prisma.category.create({
      data: {
        name: "Blog",
        slug: "blog",
        active: true,
      },
    });
    const categoryProduct = await prisma.category.create({
      data: {
        name: "Ürünler",
        slug: "urunler",
        active: true,
      },
    });

    const pages = await prisma.dynamicPage.createMany({
      data: [
        {
          title: "Hakkımızda",
          slug: "hakkimizda",
          content: "Hakkımızda sayfası",
          categoryId: categoryCorp.id,
          userId,
          published: true,
        },
        {
          title: "Misyonumuz",
          slug: "misyonumuz",
          content: "Misyonumuz sayfası",
          categoryId: categoryCorp.id,
          userId,
          published: true,
        },
        {
          title: "Blog 1",
          slug: "blog-1",
          content: "Blog 1 sayfası",
          categoryId: categoryBlog.id,
          userId,
          published: true,
        },
        {
          title: "Blog 2",
          slug: "blog-2",
          content: "Blog 2 sayfası",
          categoryId: categoryBlog.id,
          userId,
          published: true,
        },
        {
          title: "Ürün 1",
          slug: "urun-1",
          content: "Ürün 1 sayfası",
          categoryId: categoryProduct.id,
          userId,
          published: true,
        },
        {
          title: "Ürün 2",
          slug: "urun-2",
          content: "Ürün 2 sayfası",
          categoryId: categoryProduct.id,
          userId,
          published: true,
        },
      ],
    });

    return new Response(
      JSON.stringify({ message: "Database seeded successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error seeding database" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
