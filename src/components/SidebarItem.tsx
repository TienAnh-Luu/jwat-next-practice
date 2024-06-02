import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Menu } from "./Layout";
import { getPathParts } from "@/utils/routerUtils";

const SidebarItem = ({ item }: { item: Menu }) => {
  const pathParts = getPathParts();
  const isInThisRoute =
    pathParts.includes(item.label.toLowerCase()) ||
    (pathParts.length === 0 && item.label === "Home");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            isInThisRoute
              ? "text-accent-foreground bg-accent"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground md:h-8 md:w-8`}
        >
          {item.icon}
          <span className='sr-only'>{item.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right'>{item.label}</TooltipContent>
    </Tooltip>
  );
};

export default SidebarItem;
