import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  IoCall,
  IoCallOutline,
  IoHome,
  IoHomeOutline,
  IoListCircle,
  IoListCircleOutline,
} from "react-icons/io5";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "ارتباط",
        href: "/contact",
        icon: IoCallOutline ,
        activeIcon: IoCall ,
        active: pathname.includes("/contact"),
      },
      {
        label: "صفحه اصلی",
        href: "/",
        icon: IoHomeOutline,
        activeIcon: IoHome,

        active: pathname === "/",
      },
      {
        label: "لیست",
        href: "/list",
        icon: IoListCircleOutline ,
        activeIcon: IoListCircle ,

        active: pathname.includes("/list"),
      },
    ],
    [pathname]
  );

  return routes;
};
export default useRoutes;