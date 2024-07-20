import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AdminLayout from "../../components/layout/admin/Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import EditUserRole from "../../components/modal/EditUserRole";
import { fetchGetUser } from "@/api/User/fetchGetUser";

export default function ManageUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editedRole, setEditedRole] = useState({
    role: "",
  });
  const [searchUser, setSearchUser] = useState("");
  const [isModalEditRoleOpen, setIsModalEditRoleOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleModalEditRole = (userData) => {
    setEditedRole(userData);
    setIsModalEditRoleOpen(!isModalEditRoleOpen);
  };

  const getUsers = async () => {
    try {
      const usersData = await fetchGetUser();
      setListUsers(usersData.data);
      setFilteredUsers(usersData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchUser(searchValue);
    setFilteredUsers(
      listUsers.filter((user) => user.name.toLowerCase().includes(searchValue))
    );
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const renderPaginationItems = () => {
    const paginationItems = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 4) {
        paginationItems.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let page = startPage; page <= endPage; page++) {
        paginationItems.push(
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 3) {
        paginationItems.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <div>
      <AdminLayout>
        <div className="mb-4">
          <Input
            placeholder="Search user by entering his/her name..."
            className="border-2 border-[#77E4C8]"
            value={searchUser}
            onChange={handleSearch}
          />
        </div>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="rounded-tl-md text-black">No.</TableHead>
              <TableHead className="text-black">Profile Picture</TableHead>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Role</TableHead>
              <TableHead className="text-center rounded-tr-md text-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>{indexOfFirstUser + index + 1}</TableCell>
                <TableCell>
                  <img
                    src={data.profilePictureUrl}
                    alt={data.name}
                    className="w-28 rounded-full aspect-square"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/dummy.png";
                    }}
                  />
                </TableCell>
                <TableCell>
                  {data.name
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </TableCell>
                <TableCell>
                  {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
                </TableCell>
                <TableCell className="">
                  <Link to="">
                    <Pencil
                      size={24}
                      className="mx-auto"
                      onClick={() => handleModalEditRole(data)}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <Pagination className="flex justify-end mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>

      {isModalEditRoleOpen && (
        <EditUserRole
          handleModalEditRole={handleModalEditRole}
          editedRole={editedRole}
          setEditedRole={setEditedRole}
          getUsers={getUsers}
        />
      )}
    </div>
  );
}
