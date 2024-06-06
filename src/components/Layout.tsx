import MenuSheet from "./MenuSheet";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import BreadcrumbHeader from "./BreadcrumbHeader";
import { Package2, Home, Users2 } from "lucide-react";
import { TooltipProvider } from "./ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type Menu = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const menu: Menu[] = [
  {
    label: "CLV",
    icon: <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />,
    href: "https://www.cyberlogitec.com.vn/",
  },
  {
    label: "Home",
    icon: <Home className='h-5 w-5' />,
    href: "/",
  },
  {
    label: "Users",
    icon: <Users2 className='h-5 w-5' />,
    href: "/users",
  },
];

const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
          <Sidebar menu={menu} />
          <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
            <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
              <MenuSheet menu={menu} />
              <BreadcrumbHeader />
              <SearchBar />
              <UserMenu />
            </header>
            <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Layout;
