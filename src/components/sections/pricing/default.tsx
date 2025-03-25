import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getUser } from "@/lib/getUser";
import { checkAccess } from "@/lib/middleware";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
export default async function DefaultPricingSection() {
  const access = await checkAccess("pricing");
  if (!access) {
    return null;
  }
  const { isVisitor } = await getUser();
  return (
    <>
      {/* Pricing */}
      <div className="container py-16 lg:py-28">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Fiyatlandırma
          </h2>
          <p className="mt-1 text-muted-foreground">
            Herkes için uygun aylık fiyatlar ile hızlıca e-ticaret çözümleri
            oluşturun.
          </p>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="mt-12 grid sm:grid-cols-1 lg:grid-cols-3 gap-6 lg:items-center">
          {/* Card */}
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Hobi</CardTitle>
              <span className="font-bold text-5xl">0₺</span>
            </CardHeader>
            <CardDescription className="text-center">
              Ücretsiz bir şekilde kullanın.
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Proje yönetimi</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Proje takibi</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Proje planlama</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"} asChild>
                {isVisitor ? (
                  <Link href={"/sign_in"}>Şimdi başla</Link>
                ) : (
                  <Link href={"/dashboard"}>Şimdi başla</Link>
                )}
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="border-primary">
            <CardHeader className="text-center pb-2">
              <Badge className="uppercase w-max self-center mb-3">
                En popüler
              </Badge>
              <CardTitle className="!mb-7">Başlangıç</CardTitle>
              <span className="font-bold text-5xl">39₺</span>
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              Başlangıç seviyesi için en iyi seçenek
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Tüm temel işlevler
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Analiz Ve Raporlama
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">2 kullanıcı</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Ürün desteği</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                {isVisitor ? (
                  <Link href={"/sign_in"}>Şimdi başla</Link>
                ) : (
                  <Link href={"/dashboard"}>Şimdi başla</Link>
                )}
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Kurumsal</CardTitle>
              <span className="font-bold text-5xl">149₺</span>
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              İşletmeyi ölçeklendirmek için gelişmiş özellikler
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Tüm temel işlevler
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Çoklu dil desteği
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">10 kullanıcı</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Plan özellikleri
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Ürün desteği</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"} asChild>
                {isVisitor ? (
                  <Link href={"/sign_in"}>Şimdi başla</Link>
                ) : (
                  <Link href={"/dashboard"}>Şimdi başla</Link>
                )}
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Pricing */}
    </>
  );
}
