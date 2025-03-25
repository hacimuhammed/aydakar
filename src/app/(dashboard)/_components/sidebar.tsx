import {
  BarChart,
  BookOpen,
  Home,
  LogOut,
  Plus,
  ArrowLeft,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/getUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Aydakar from "@/components/logos/aydakar";
import Link from "next/link";
import { services } from "@/dal/services";
// Menu items.
const items = [
  {
    title: "Yönetim",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analizler",
    url: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Uygulamaya Dön",
    url: "/",
    icon: ArrowLeft,
  },
];

export async function DashboardSidebar() {
  const user = await getUser()!;
  const dynamicPageCategories =
    await services.dynamicPageCategory.getNavbarCategoriesWithPages();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full flex items-center justify-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Aydakar text="/dashboard" icon={false} />
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Avatar>
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>
              {user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <LogOut />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <LogOut /> Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Uygulamalar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className=" flex items-center justify-between gap-2">
            <div>Sayfalar</div>
            <Button variant="ghost" size="icon">
              <Plus />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dynamicPageCategories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/pages/${category.id}`}>
                      <BookOpen className="w-4 h-4" />
                      <span>{category.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
