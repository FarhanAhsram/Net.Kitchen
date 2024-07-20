import { fetchEditRole } from "@/api/User/fetchEditRole";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
/* eslint-disable react/prop-types */

export default function EditUserRole({
  handleModalEditRole,
  editedRole,
  setEditedRole,
  getUsers,
}) {
  const handleEditRoleSubmit = async (e) => {
    e.preventDefault();

    const id = editedRole.id;
    const userData = { role: editedRole.role };

    try {
      const response = await fetchEditRole({ id: id, userData: userData });
      if (response) {
        Swal.fire({
          title: "Edit Role Successful",
          text: response.message,
          icon: "success",
          showConfirmButton: true,
        });
        getUsers();
        handleModalEditRole();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#22252EAD] opacity-100 z-10">
      <div className="bg-[#FFFFFF] w-1/2 rounded-2xl p-7 max-md:w-3/4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Edit User Role</h1>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor={"pointer"}
            onClick={handleModalEditRole}
          >
            <path
              d="M12.657 1.34333L1.34326 12.657M12.657 12.657L1.34326 1.34326"
              stroke="#26355D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <hr className="border-2 border-[#EDEEEF] my-4" />

        <div>
          <form action="" onSubmit={handleEditRoleSubmit}>
            <Label>
              Role <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setEditedRole({ ...editedRole, role: value })
              }
            >
              <SelectTrigger className="w-full mt-2 mb-4">
                <SelectValue
                  placeholder={
                    editedRole.role.charAt(0).toUpperCase() +
                    editedRole.role.slice(1).toLowerCase()
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-6">
              <Button variant="ghost" onClick={handleModalEditRole}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
