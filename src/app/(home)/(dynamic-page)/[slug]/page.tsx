import DefaultDynamicPageSection from "@/components/sections/dynamic-page/default";
import { services } from "@/dal/services";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const dynamicPage = await services.dynamicPage.getDynamicPageBySlug(slug);
  return {
    title: dynamicPage?.title || "Dynamic Page Not Found",
    description: dynamicPage?.content || "Dynamic Page Not Found",
    keywords: [],
    robots: dynamicPage ? undefined : "noindex",
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dynamicPage = await services.dynamicPage.getDynamicPageBySlug(slug);
  if (!dynamicPage) redirect("/");
  return <DefaultDynamicPageSection page={dynamicPage} />;
}
