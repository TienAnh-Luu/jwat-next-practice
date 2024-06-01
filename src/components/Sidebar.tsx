import SidebarItem from "./SidebarItem";
import { Settings } from "lucide-react";
import { useRouter } from "next/router";
import { Menu } from "./Layout";

const Sidebar = ({ menu }: { menu: Menu[] }) => {
  const router = useRouter();

  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        {menu.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <SidebarItem
          item={{
            label: "Setting",
            icon: <Settings className='h-5 w-5' />,
            href: "#",
          }}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
