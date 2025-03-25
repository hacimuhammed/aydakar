import { services } from "@/dal/services";
import { MostUsedBrowsersChart } from "../../../_components/charts/browsers";
import { MostUsedOperatingSystemsChart } from "../../../_components/charts/operating-systems";
import { MostUsedDevicesChart } from "../../../_components/charts/devices";
import { MostVisitedPagesChart } from "../../../_components/charts/pages";
import { MostReferrersChart } from "../../../_components/charts/referrers";
import { AnalyticDayPicker } from "@/app/(dashboard)/_components/ui/analytic-day-picker";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ day?: string[] }>;
}) {
  const day = (await params).day?.[0] ?? 7;
  const analtics = await services.analytic.getAnalytics(Number(day));
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Analiz Dashboard</h1>
      <div className="flex items-center justify-between mb-4">
        <AnalyticDayPicker currentDay={Number(day)} />
        <Button variant="outline">
          <Download className="w-4 h-4" /> İndir
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MostUsedBrowsersChart data={analtics.mostUsedBrowsers} />
          <MostUsedOperatingSystemsChart
            data={analtics.mostUsedOperatingSystems}
          />
          <MostUsedDevicesChart data={analtics.mostUsedDevices} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <MostVisitedPagesChart data={analtics.mostVisitedPages} />
          <MostReferrersChart data={analtics.mostReferrers} />
        </div>
      </div>
    </div>
  );
}
