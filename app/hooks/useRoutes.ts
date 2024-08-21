import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  IoCheckbox,
  IoCheckboxOutline,
  IoHome,
  IoHomeOutline,
} from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Profile",
        href: "/profile",
        icon: PiUserCircleLight,
        activeIcon: FaUserCircle,
        active: pathname.includes("/profile"),
      },
      {
        label: "Home",
        href: "/",
        icon: IoHomeOutline,
        activeIcon: IoHome,

        active: pathname === "/",
      },
      {
        label: "My Todos",
        href: "/my-todos",
        icon: IoCheckboxOutline,
        activeIcon: IoCheckbox,

        active: pathname.includes("/my-todos"),
      },
    ],
    [pathname]
  );

  return routes;
};
export default useRoutes;