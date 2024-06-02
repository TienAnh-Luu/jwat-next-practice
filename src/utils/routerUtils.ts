import { useRouter } from "next/router";

export const getPathParts = () => {
  const router = useRouter();
  const { pathname } = router;
  const pathParts = pathname.split("/").filter((part) => part);
  return pathParts;
};
