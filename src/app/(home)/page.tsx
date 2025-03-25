import HeroGeometric from "@/components/sections/hero/default";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import { ProgressiveBlur } from "@/components/core/progressive-blur";
import { checkAccess } from "@/lib/middleware";
import Image from "next/image";
import { unauthorized } from "next/navigation";
import ElegantShape from "@/components/core/elegant-shape";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DefaultPricingSection from "@/components/sections/pricing/default";
export default async function Home() {
  const access = await checkAccess("home");
  if (!access) {
    unauthorized();
  }
  return (
    <div className="w-full flex flex-col gap-4">
      {/** Hero Section */}
      <div className="rounded-b-[4rem] min-h-[calc(100vh-1rem)] overflow-hidden shadow-lg shadow-black/20 dark:shadow-white/20 border-b-2 border-black/20 dark:border-white/20">
        <HeroGeometric />
      </div>
      {/** Templates Section */}
      <div className="w-full flex justify-center mt-4">
        <div className="container px-3">
          <div className="flex flex-col lg:flex-row gap-4">
            {/** Who We Are */}
            <Card className="w-full lg:w-1/2 p-4 max-w-2xl border-none shadow-none">
              <CardHeader>
                <div className="relative w-full flex justify-center items-center">
                  <Image
                    src="/illustrations/shine.png"
                    alt="Shine"
                    className=""
                    width={80}
                    height={80}
                  />
                </div>
                <CardTitle className="flex justify-center items-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/70 to-black dark:from-white dark:to-white/80">
                  <h1 className="text-center">Aydakar E-Ticaret Çözümleri</h1>
                </CardTitle>
                <CardDescription className="text-lg">
                  {`Aydakar'da size özel tasarlanan onlarca e-ticaret şablonlarını
                  kullanarak kullanıcılarınızın ihtiyacı olan e-ticaret
                  çözümlerini hızlıca oluşturun.`}
                </CardDescription>
              </CardHeader>
            </Card>
            {/** E-Commerce Templates */}
            <div className="w-full lg:w-1/2 flex justify-center mt-4 rounded-3xl overflow-hidden shadow-sm shadow-black/20 dark:shadow-white/20">
              <div className="relative h-[20rem] w-full overflow-hidden">
                <ElegantShape
                  className="absolute -top-4 -left-4 z-0"
                  width={300}
                  height={50}
                  delay={0.5}
                  rotate={-20}
                  gradient="from-blue-500/[0.05] to-purple-500/[0.05] dark:from-blue-500/[0.05] dark:to-purple-500/[0.05] border-2 border-black/20 dark:border-white/20"
                />
                <ElegantShape
                  className="absolute -bottom-4 -right-4 z-0"
                  width={300}
                  height={50}
                  delay={0.5}
                  rotate={-20}
                  gradient="from-blue-500/[0.05] to-purple-500/[0.05] dark:from-blue-500/[0.05] dark:to-purple-500/[0.05] border-2 border-black/20 dark:border-white/20"
                />
                <InfiniteSlider
                  className="flex h-full w-full items-center"
                  gap={100}
                  duration={75}
                  durationOnHover={150}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-32 text-center text-4xl font-[450] text-black dark:text-white"
                    >
                      <Button variant="outline" asChild>
                        <Link href={`/templates/${index + 1}`}>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Örnekleri Görüntüle
                        </Link>
                      </Button>
                    </div>
                  ))}
                </InfiniteSlider>
                <ProgressiveBlur
                  className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
                  direction="right"
                  blurIntensity={1}
                />
                {/** Flower Illustration */}
                <Image
                  src="/illustrations/flower.png"
                  alt="Flower"
                  className="absolute  -rotate-6 -bottom-24 hover:rotate-0 transition-transform duration-300 ease-in-out -right-3 dark:invert select-none pointer-events-none drop-shadow-xl"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** Pricing Section */}
      <div className="w-full flex justify-center mt-4">
        <div className="container px-3">
          <DefaultPricingSection />
        </div>
      </div>
    </div>
  );
}
