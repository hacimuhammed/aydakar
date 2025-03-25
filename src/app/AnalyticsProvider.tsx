import { trackPageView } from "@/lib/analytics";
import { headers } from "next/headers";
import React from "react";

export async function AnalyticsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await trackPageView();
  return children;
}

export default AnalyticsProvider;
