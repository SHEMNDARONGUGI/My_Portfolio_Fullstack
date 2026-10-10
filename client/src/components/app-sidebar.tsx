import type { ComponentProps } from "react";
import {
  Award,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  Inbox,
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
  { id: "projects", title: "Projects", icon: FolderKanban },
  { id: "experience", title: "Experience", icon: BriefcaseBusiness },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "certifications", title: "Certifications", icon: Award },
  { id: "skills", title: "Skills", icon: Code2 },
  { id: "services", title: "Services", icon: Wrench },
];

export function AppSidebar({
  userName = "Administrator",
  selectedSection,
  onSectionChange,
  ...props
}: ComponentProps<typeof Sidebar> & {
  userName?: string;
  selectedSection: string;
  onSectionChange: (sectionId: string) => void;
}) {
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
            {portfolioSections.map(({ id, title, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton
                  asChild
                  isActive={selectedSection === id}
                >
                  <a href="#manager" onClick={() => onSectionChange(id)}>
                    <Icon />
                    <span>{title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Inbox</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={selectedSection === "messages"}
              >
                <a href="#messages" onClick={() => onSectionChange("messages")}>
                  <Inbox />
                  <span>Messages</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
