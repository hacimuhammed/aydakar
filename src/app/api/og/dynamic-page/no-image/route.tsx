/* eslint-disable @next/next/no-img-element */
export const revalidate = 0;

import { services } from "@/dal/services";
import { ImageResponse } from "next/og";

// Helper function to convert ArrayBuffer to base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // Fetch the image and convert to base64
  const noImageBuffer = await fetch(
    new URL("/illustrations/no-image.png", request.url)
  ).then((res) => res.arrayBuffer());
  const noImageUrl = arrayBufferToBase64(noImageBuffer);

  if (!slug) {
    return new ImageResponse(
      (
        <div tw="flex flex-col items-center justify-center w-full h-full">
          <h1 tw="text-4xl font-bold">Not Found</h1>
        </div>
      ),
      {
        width: 1000,
        height: 1000,
      }
    );
  }
  const page = await services.dynamicPage.getDynamicPageBySlug(slug);
  if (!page) {
    return new ImageResponse(
      (
        <div tw="flex flex-col items-center justify-center w-full h-full">
          <h1 tw="text-4xl font-bold">Page not found</h1>
        </div>
      ),
      {
        width: 1000,
        height: 1000,
      }
    );
  }
  const title = page.title;
  return new ImageResponse(
    (
      <div tw="flex flex-col items-center justify-start w-full h-full relative">
        <img
          src={noImageUrl}
          alt="No Image"
          tw="absolute left-0 top-0 w-full h-full"
        />
        <h1 tw="text-[4rem] font-bold bg-white text-black rounded-full px-8 py-4">
          {title}
        </h1>
        <span tw="text-[2rem] text-white bg-red-500 font-bold rounded-full px-8 py-4">
          Resim Hazırlanıyor...
        </span>
      </div>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}
