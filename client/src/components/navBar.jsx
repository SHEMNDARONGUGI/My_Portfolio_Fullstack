import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function NavigationBar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" className="text-xl font-bold tracking-tight">
          Shem<span className="text-blue-500">Dev</span>
        </a>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <a
                href="#home"
                className="rounded-lg px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Home
              </a>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a
                href="#about"
                className="rounded-lg px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                About
              </a>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a
                href="#projects"
                className="rounded-lg px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Projects
              </a>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a
                href="#contact"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Contact
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
