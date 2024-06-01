import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LineChart, Package2, PanelLeft } from "lucide-react";
import Link from "next/link";
import { Menu } from "./Layout";
import { getPathParts } from "@/utils/routerUtils";

const MenuSheet = ({ menu }: { menu: Menu[] }) => {
  const pathParts = getPathParts();
  const fullMenu: Menu[] = [...menu];
  fullMenu.push({
    label: "Settings",
    icon: <LineChart className='h-5 w-5' />,
    href: "#",
  });
  fullMenu.shift(); // remove dashboard from menu cuz it has different style

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='sm:hidden'>
          <PanelLeft className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='sm:max-w-xs'>
        <nav className='grid gap-6 text-lg font-medium'>
          <Link
            href='#'
            className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
          >
            <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          {fullMenu.map((item) => {
            const isInThisRoute = pathParts.includes(item.label.toLowerCase());
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-2.5 ${
                  isInThisRoute
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
