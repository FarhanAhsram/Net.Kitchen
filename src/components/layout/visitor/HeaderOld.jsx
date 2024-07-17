"use client";

import { fetchLogout } from "@/api/Auth/fetchLogout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const listNavbar = [
  {
    title: "Home",
    url: ["/"],
  },
  {
    title: "Foods",
    url: ["/listfoods", "/detailfood/:id"],
  },
  {
    title: "Favorite",
    url: ["/favorite"],
  },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetchLogout();

      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-[#FFC94A] flex justify-between items-center px-12 h-20 max-md:px-8">
      <div className="font-bold text-3xl">
        <h1>Net.Kitchen</h1>
      </div>
      <div className="max-md:hidden">
        <ul className="flex justify-center items-center gap-8">
          {listNavbar.map((item, index) => (
            <li key={index}>
              <Link
                to={item.url[0]}
                className={cn(
                  "text-md font-semibold p-2 hover:border-b-4 hover:border-b-slate-600",
                  item.url.includes(location.pathname)
                    ? "text-primary border-b-4 border-b-slate-950"
                    : ""
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-md:hidden">
        <Link to={"/login"}>
          <Button
            variant="default"
            className="text-md px-5 bg-[#3E3232]"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Link>
      </div>
      <div className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 bg-transparent border-none hover:bg-gray-200 mr-2 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>
    </nav>
  );
}
