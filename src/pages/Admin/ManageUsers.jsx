import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminLayout from "../../components/layout/admin/Layout";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { fetchGetUser } from "@/api/User/fetchGetUser";
import EditUserRole from "../../components/modal/EditUserRole";

export default function ManageUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [editedRole, setEditedRole] = useState({
    role: "",
  });

  const [isModalEditRoleOpen, setIsModalEditRoleOpen] = useState(false);

  const handleModalEditRole = (userData) => {
    setEditedRole(userData);
    setIsModalEditRoleOpen(!isModalEditRoleOpen);
  };

  const getUsers = async () => {
    try {
      const usersData = await fetchGetUser();
      setListUsers(usersData.data);
      // console.log(usersData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <AdminLayout>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Profile Picture</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listUsers.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={data.profilePictureUrl}
                    alt={data.name}
                    className="w-24 h-24 rounded-full"
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
                  <Link href={""}>
                    <Pencil
                      className="h-5 w-5 mx-auto"
                      onClick={() => handleModalEditRole(data)}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="flex justify-end mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
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
