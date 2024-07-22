"use client";

import { fetchLogout } from "@/api/Auth/fetchLogout";
import { MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import { fetchUserLogin } from "@/api/User/fetchUserLogin";
import Swal from "sweetalert2";

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

  const [user, setUser] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = localStorage.getItem("role");

  const getUserLogin = async () => {
    try {
      const usersData = await fetchUserLogin();
      // console.log(usersData.user);
      setUser(usersData.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetchLogout();

      if (response) {
        Swal.fire({
          title: "Logout Successful",
          text: response.message,
          icon: "success",
          showConfirmButton: true,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <header className="inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Food Catalog</span>
              <h1 className="font-semibold text-3xl font-cursive md:text-4xl">
                Net.Kitchen
              </h1>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {listNavbar.map((item, index) => (
              <Link
                key={index}
                to={item.url[0]}
                className={cn(
                  "text-lg font-semibold p-2 hover:border-b-4 hover:border-b-[#248891D7]",
                  item.url.includes(location.pathname)
                    ? "text-primary border-b-4 border-b-[#77E4C8]"
                    : ""
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
            <h1 className="text-lg font-semibold">{user.name}</h1>
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={user.profilePictureUrl}
                    className="h-14 w-14 rounded-full border-2 border-[#77E4C8]"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {role === "admin" && (
                  <MenuItem>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                    >
                      Go To Dashboard
                    </Link>
                  </MenuItem>
                )}
                <MenuItem>
                  <Link
                    to="/userprofile"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  >
                    Update Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    className="block px-4 py-2 text-sm font-bold text-red-900 hover:bg-red-100"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </nav>

        {/* Responsive Ver. */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <h1 className="font-bold text-3xl font-cursive">Net.Kitchen</h1>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 mb-4 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {listNavbar.map((item, index) => (
                    <Link
                      key={index}
                      to={item.url[0]}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100",
                        item.url.includes(location.pathname)
                          ? "text-primary bg-[#77E4C8]"
                          : ""
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt={user.name}
                    src={user.profilePictureUrl}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <div className="text-base font-medium leading-none">
                    {user.name}
                  </div>
                  <div className="text-base">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="divide-y divide-gray-500/10">
                  <div className="space-y-2">
                    <a
                      href="/userprofile"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                    >
                      Update Profile
                    </a>
                    <Link
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-900 hover:bg-red-100"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
