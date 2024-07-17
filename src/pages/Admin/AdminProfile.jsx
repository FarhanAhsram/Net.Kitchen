import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/admin/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fetchUserLogin } from "@/api/User/fetchUserLogin";
import { fetchUploadImg } from "@/api/fetchUploadImg";
import { fetchEditUser } from "@/api/User/fetchEditUser";
import Swal from "sweetalert2";

export default function AdminProfile() {
  const [user, setUser] = useState({});
  const [previewImage, setPreviewImage] = useState("");

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageUser = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      profilePictureUrl: file,
    });

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();

    try {
      let profilePictureUrl = user.profilePictureUrl;

      if (profilePictureUrl instanceof File) {
        const formData = new FormData();
        formData.append("image", profilePictureUrl);
        profilePictureUrl = await fetchUploadImg(formData);
      }

      const formDataEdited = {
        ...user,
        profilePictureUrl: profilePictureUrl,
      };

      const response = await fetchEditUser({ userData: formDataEdited });

      if (response) {
        Swal.fire({
          title: "User Edited Successfully",
          text: response.message,
          icon: "success",
          showConfirmButton: true,
        });
        getUserLogin();
      }
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  const getUserLogin = async () => {
    try {
      const usersData = await fetchUserLogin();
      // console.log(usersData.user);
      setUser(usersData.user);
      setPreviewImage(usersData.user.profilePictureUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="border shadow-lg rounded-md p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4 flex justify-center items-center">
              <img
                src={previewImage}
                alt={user.name}
                className="rounded-full"
              />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div>
                <form action="" onSubmit={handleEditUserSubmit}>
                  <div className="mb-4">
                    <Label>
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-2"
                      placeholder="Name"
                      value={user.name}
                      onChange={handleEditUserChange}
                    />
                  </div>
                  <div className="mb-4">
                    <Label>
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      className="mt-2"
                      placeholder="Email"
                      value={user.email}
                      onChange={handleEditUserChange}
                    />
                  </div>
                  <div className="mb-4">
                    <Label>
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="mt-2"
                      placeholder="Phone Number"
                      value={user.phoneNumber}
                      onChange={handleEditUserChange}
                    />
                  </div>
                  <div className="mb-4">
                    <Label>
                      Profile Picture <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="file"
                      id="profilePictureUrl"
                      name="profilePictureUrl"
                      className="mt-2"
                      placeholder="Profile Picture"
                      onChange={handleImageUser}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
