import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";

import {
  IoCall,
  IoCallOutline,
  IoHome,
  IoHomeOutline,
  IoListCircle,
  IoListCircleOutline,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { DetailsComponents } from "../types/details-components-type";

const useDetalisRoutes = () => {
  const selected: "details" | "personal" | "others" = "details";
  const detailsRoutes = useMemo<DetailsComponents[]>(
    () => [
        {
            label: "دیگر کارت های شما",
            selected:"others",
        },
        {
            label: "اطلاعات شخص",
        selected:"personal",
      },
    {
      label: "جزئیات کارت",
      selected:"details",
      
    },
    ],
    [selected]
  );

  return { detailsRoutes, selected };
};
export default useDetalisRoutes;
