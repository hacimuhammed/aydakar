import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Aydakar from "@/components/logos/aydakar";
import { Button } from "@/components/ui/button";
import { GetNavbarCategoriesWithPages } from "@/dal/dynamic-page-category/dynamic-page-category";
import { Menu } from "lucide-react";
import Link from "next/link";

const NavbarDrawer = ({
  dynamicPagesWithCategories,
}: {
  dynamicPagesWithCategories: GetNavbarCategoriesWithPages;
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5 rotate-0 scale-100" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Link href="/" className="flex justify-center items-center gap-2">
              <Aydakar className="h-10" />
            </Link>
          </DrawerTitle>
          <div className="flex flex-col gap-4">
            {dynamicPagesWithCategories.map((category) => (
              <DropdownMenu key={category.id}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{category.name}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {category.pages.map((page) => (
                    <DropdownMenuItem key={page.id}>
                      {page.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link href="/pricing">Fiyatlandırma</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">İletişim</Link>
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default NavbarDrawer;
