"use server";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageResponse } from "next/og";

interface DynamicPageProps {
  page: {
    title: string;
    content: string;
    imageUrl: string | null;
    slug: string;
  };
}

export default async function DefaultDynamicPageSection({
  page,
}: DynamicPageProps) {
  if (!page) return null;
  const { title, content, imageUrl } = page;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const fallbackImageUrl = `/api/og/dynamic-page/no-image?slug=${page.slug}`;
  return (
    <div className="container py-24 lg:py-32">
      {/* Grid */}
      <div className="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-center">
        <div className="hidden md:block mb-24 md:mb-0 sm:px-6">
          <div className="relative">
            <Image
              className="rounded-xl dark:brightness-75"
              src={imageUrl || fallbackImageUrl}
              alt={title}
              width={500}
              height={600}
            />
            {/* SVG Element */}
            <div className="absolute bottom-0 start-0 -z-[1] translate-y-10 -translate-x-14">
              <svg
                className="max-w-40 h-auto text-muted-foreground"
                width="696"
                height="653"
                viewBox="0 0 696 653"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="72.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="623.5" r="29.5" fill="currentColor" />
              </svg>
            </div>
            {/* End SVG Element */}
          </div>
        </div>
        {/* End Col */}

        <div>
          {/* Blockquote */}
          <div className="relative">
            <svg
              className="absolute top-0 start-0 transform -translate-x-8 -translate-y-4 size-24 text-muted-foreground/15"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3Z"
                fill="currentColor"
              />
            </svg>

            <div className="relative z-10">
              <p className="flex gap-2 text-xl font-semibold text-muted-foreground tracking-wide uppercase mb-3">
                {title}
              </p>

              <div
                dangerouslySetInnerHTML={{
                  __html: content || "",
                }}
              />
            </div>
          </div>
          {/* End Blockquote */}
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
}
