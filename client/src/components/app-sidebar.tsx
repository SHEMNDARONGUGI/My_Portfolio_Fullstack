import type { ComponentProps } from "react";
import {
  Award,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  PanelsTopLeft,
  Wrench,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const portfolioSections = [
  { title: "Projects", href: "#manager", icon: FolderKanban },
  { title: "Experience", href: "#manager", icon: BriefcaseBusiness },
  { title: "Education", href: "#manager", icon: GraduationCap },
  { title: "Certifications", href: "#manager", icon: Award },
  { title: "Skills", href: "#manager", icon: Code2 },
  { title: "Services", href: "#manager", icon: Wrench },
];

export function AppSidebar({
  userName = "Administrator",
  ...props
}: ComponentProps<typeof Sidebar> & { userName?: string }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4">
        <a href="#overview" className="text-lg font-bold">
          Shem<span className="text-emerald-500"> CMS</span>
        </a>
        <p className="text-xs text-muted-foreground">Content dashboard</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#overview">
                  <LayoutDashboard />
                  <span>Overview</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#manager">
                  <PanelsTopLeft />
                  <span>Manage content</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Portfolio content</SidebarGroupLabel>
          <SidebarMenu>
            {portfolioSections.map(({ title, href, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton asChild>
                  <a href={href}>
                    <Icon />
                    <span>{title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t px-4 py-3">
        <p className="truncate text-sm font-medium">{userName}</p>
        <p className="text-xs text-muted-foreground">Portfolio administrator</p>
      </SidebarFooter>
    </Sidebar>
  );
}
