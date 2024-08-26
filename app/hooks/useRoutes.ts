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
import { IconType } from "react-icons/lib";
type RoutesType = {
  label: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
  active: boolean;
  children?: RoutesType[];
};
const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo<RoutesType[]>(
    () => [
      {
        label: "ارتباط",
        href: "/contact",
        icon: IoCallOutline,
        activeIcon: IoCall,
        active: pathname.includes("/contact"),
      },
      {
        label: "صفحه اصلی",
        href: "/",
        icon: IoHomeOutline,
        activeIcon: IoHome,

        active: pathname === "/",
        children: [
          {
            label: "ورود ادمین",
            href: "/list/admin",
            icon: IoListCircleOutline,
            active: pathname === "/list/admin",
            activeIcon: IoListCircle,
          },
        ],
      },
      {
        label: "لیست",
        href: "/list",
        icon: IoListCircleOutline,
        activeIcon: IoListCircle,

        active: pathname === "/list",
        children: [
          {
            label: "تغییر لیست",
            href: "/list/admin/change-list",
            icon: IoCall,
            active: pathname === "/list/admin/change-list",
            activeIcon: IoCall,
          },
        ],
      },
    ],
    [pathname]
  );

  return routes;
};
export default useRoutes;
