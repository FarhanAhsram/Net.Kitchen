import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowLeftToLine, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarResponsive, Title } from "./Sidebar";
import { fetchLogout } from "@/api/Auth/fetchLogout";
import { useEffect, useState } from "react";
import { fetchUserLogin } from "@/api/User/fetchUserLogin";
/* eslint-disable react/prop-types */

export default function AdminLayout({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUserLogin = async () => {
    try {
      const usersData = await fetchUserLogin();
      // console.log(usersData.user);
      setUser(usersData.user);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getUserLogin();
  }, []);

  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[284px_1fr]">
        <div className="hidden border-r h-screen lg:block sticky top-0">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex justify-center items-center pt-8">
              <h1 className="font-bold text-4xl font-cursive text-[#77E4C8]">
                Net.Kitchen
              </h1>
            </div>
            <div className="flex-1">
              <Sidebar />
            </div>
            <div className="flex justify-center items-center py-4 border-t-4">
              <Link
                to="/"
                className="flex items-center text-xl font-bold rounded-lg gap-3 px-3 py-4 text-muted-foreground transition-all hover:text-primary hover:bg-[#77e4c936]"
              >
                <ArrowLeftToLine className="h-7 w-7" />
                Back To Website
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex items-center border-b pt-4 pb-6 px-6">
            {/* Responsive Sidebar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 bg-transparent border-none hover:bg-gray-200 mr-2 lg:hidden"
                >
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col w-80 bg-white">
                <div className="flex justify-center items-center pt-8">
                  <h1 className="font-bold text-4xl font-cursive text-[#77E4C8] pb-8">
                    Net.Kitchen
                  </h1>
                </div>
                <div className="flex-1">
                  <SidebarResponsive />
                </div>
                <div className="flex justify-center items-center pb-8">
                  <Button
                    variant="primary"
                    className="w-3/4"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="text-2xl w-full font-semibold">
              <Title />
            </div>
            <div className="w-full flex justify-end items-center">
              <h1 className="text-md font-semibold">{user.name}</h1>
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={user.profilePictureUrl}
                      className="h-10 w-10 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="/adminprofile"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                    >
                      Update Profile
                    </a>
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
          </header>

          <main className="flex flex-1 flex-col py-4 px-6 bg-gray-100">
            <div className="">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
