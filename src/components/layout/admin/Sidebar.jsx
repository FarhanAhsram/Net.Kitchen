"use client";

import { ChefHat, LayoutDashboard, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "List Users",
    url: "/manageusers",
    icon: Users,
  },
  {
    title: "List Foods",
    url: "/managefoods",
    icon: ChefHat,
  },
  {
    title: "Settings",
    url: "/adminprofile",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <nav className="grid items-start gap-2 px-4">
      {menu.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link
            key={index}
            to={item.url}
            className={cn(
              "flex items-center text-lg font-medium rounded-lg gap-3 px-3 py-4 text-muted-foreground transition-all hover:text-primary",
              location.pathname === item.url ? "bg-gray-400 text-primary" : ""
            )}
          >
            <Icon className="h-5 w-5" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarResponsive() {
  return (
    <nav className="grid items-start gap-2">
      {menu.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            to={item.url}
            className={cn(
              "flex items-center text-lg font-medium rounded-lg gap-3 px-3 py-4 text-muted-foreground transition-all hover:text-primary",
              location.pathname === item.url ? "text-primary bg-gray-200" : ""
            )}
          >
            <Icon className="h-5 w-5" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function Title() {
  const { pathname } = useLocation();

  const currentMenuItem = menu.find((item) => {
    if (Array.isArray(item.url)) {
      return item.url.some((url) => pathname.includes(url));
    }
    return pathname === item.url;
  });

  return (
    <div>
      {currentMenuItem && (
        <div>
          <p>{currentMenuItem.title}</p>
        </div>
      )}
    </div>
  );
}
