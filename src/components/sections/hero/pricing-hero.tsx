import { pacificoFont } from "@/app/fonts/pacifico";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSectionWithPricing() {
  return (
    <>
      {/* Hero */}
      <div className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3">
            <h1
              className={`text-4xl font-bold tracking-tight lg:text-5xl ${pacificoFont}`}
            >
              <span className="block lowercase">Aydakar</span>
              <span className="block mt-2">Fiyatlandırma</span>
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Esnek fiyatlandırma ile herkes için uygun aylık fiyatlar ile
              hızlıca e-ticaret çözümleri oluşturun.
            </p>
          </div>
          {/* End Col */}
          <div className="relative hidden lg:flex lg:col-span-4 mt-10 lg:mt-0 justify-end items-center">
            <div className="relative h-[25rem] w-[25rem] duration-300 hover:scale-105 flex justify-center items-center bg-green-600 dark:bg-green-700 rounded-full bg-gradient-to-br from-green-300 to-green-700 dark:from-green-600 dark:to-green-900">
              <div className="absolute h-[25rem] w-[25rem] ">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-white text-2xl font-bold z-10">
                  <TextShimmer className="text-base font-bold">
                    Esnek Fiyatlandırma ile herkes için uygun aylık fiyatlar
                  </TextShimmer>
                  <Button className="mt-2 bg-green-600 hover:bg-green-700 text-white">
                    <LucideArrowRight className="w-4 h-4 mr-2" />
                    Şimdi başla
                  </Button>
                </div>
                <Image
                  src="/illustrations/note.png"
                  alt="Aydakar Fiyatlandırma"
                  fill
                  className="dark:brightness-90"
                />
              </div>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}
    </>
  );
}
