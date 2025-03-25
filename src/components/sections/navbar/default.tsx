"use server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Menu, Snowflake, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import Link from "next/link";
import React from "react";
import { services } from "@/dal/services";
import { checkAccess } from "@/lib/middleware";
import Aydakar from "@/components/logos/aydakar";
import SwitchAccount from "@/components/account/switch-account";
import NavbarDrawer from "./drawer";
import { GetNavbarCategoriesWithPages } from "@/dal/dynamic-page-category/dynamic-page-category";
const NavbarDefault = async () => {
  const isAdmin = await checkAccess("dashboard");
  const dynamicPagesWithCategories: GetNavbarCategoriesWithPages =
    await services.dynamicPageCategory.getNavbarCategoriesWithPages();

  const deviceSessions = await services.account.getDeviceSessions();
  return (
    <Card className="z-50 sticky top-0 left-0 backdrop-blur-md shadow-md  container bg-card/60 py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
      <div className="text-2xl font-bold">
        <Link href="/" className="flex items-center gap-2">
          <Aydakar as={"h1"} />
        </Link>
      </div>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList key={nanoid()}>
          {dynamicPagesWithCategories.map((category) => (
            <NavigationMenuItem key={nanoid()}>
              <NavigationMenuTrigger key={nanoid()}>
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent key={nanoid()}>
                <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] lg:w-[300px] ">
                  {category._count.subcategories > 0 &&
                    category.subcategories.map((subcategory) => (
                      <ListItem
                        key={nanoid()}
                        title={subcategory.name}
                        href={subcategory.name}
                      >
                        Tümünü Görüntüle
                      </ListItem>
                    ))}
                  {category.pages.map((page) => (
                    <ListItem
                      key={nanoid()}
                      title={page.title}
                      href={page.slug}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem key={nanoid()}>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Fiyatlandırma
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                İletişim
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-1">
        {deviceSessions && deviceSessions.isIncludeAllowed && <SwitchAccount />}
        {isAdmin && (
          <>
            <Button
              className="hidden md:flex justify-center items-center h-10 w-10  ml-2 mr-2"
              asChild
            >
              <Link href={"/dashboard"} className="text-sm gap-2">
                <User className="h-5 w-fit rotate-0 text-secondary" />
              </Link>
            </Button>
          </>
        )}

        <div className="flex md:hidden mr-2 items-center gap-2">
          <NavbarDrawer
            dynamicPagesWithCategories={dynamicPagesWithCategories}
          />
        </div>

        <ThemeToggle />
      </div>
    </Card>
  );
};

export default NavbarDefault;
