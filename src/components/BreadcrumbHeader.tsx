import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getPathParts } from "@/utils/routerUtils";

const BreadcrumbHeader = () => {
  const pathParts = getPathParts();

  return (
    <Breadcrumb className='hidden md:flex'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {/* {isLast ? (
                  <BreadcrumbPage></BreadcrumbPage>
                ) : ( */}
                <BreadcrumbLink asChild>
                  <Link href={href}>
                    {part.charAt(0).toUpperCase() + part.slice(1)}
                  </Link>
                </BreadcrumbLink>
                {/* ) */}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbHeader;
