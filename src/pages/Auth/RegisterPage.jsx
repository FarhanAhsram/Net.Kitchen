import { fetchRegister } from "@/api/Auth/fetchRegister";
import { fetchUploadImg } from "@/api/fetchUploadImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    phoneNumber: "",
    profilePictureUrl: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageUser = (e) => {
    setForm({
      ...form,
      profilePictureUrl: e.target.files[0],
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", form.profilePictureUrl);

      const profilePictureUrl = await fetchUploadImg(formData);

      const formDataWithImage = {
        ...form,
        profilePictureUrl: profilePictureUrl,
      };

      const response = await fetchRegister(formDataWithImage);
      Swal.fire({
        title: "Register Successful",
        text: response.message,
        icon: "success",
        showConfirmButton: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex bg-white rounded-xl shadow-lg w-2/3 p-5">
        <div className="flex justify-center items-center w-1/2 max-lg:hidden">
          <h1>(Image)</h1>
        </div>
        <div className="w-1/2 p-2 max-lg:w-full">
          <div>
            <h1 className="text-xl">Register</h1>
            <p className="text-md">Welcome to this Website</p>
          </div>
          <div className="my-2">
            <form action="" onSubmit={handleRegisterSubmit}>
              <div className="my-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 my-2">
                <div className="">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    id="passwordRepeat"
                    name="passwordRepeat"
                    className="mt-1"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 my-2">
                <div className="">
                  <Label className="mb-5">Role</Label>
                  <Select
                    id="role"
                    name="role"
                    className="mt-1"
                    required
                    onValueChange={(value) => setForm({ ...form, role: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-2">
                <Label>Profile Picture</Label>
                <Input
                  type="file"
                  id="profilePictureUrl"
                  name="profilePictureUrl"
                  className="mt-1"
                  required
                  onChange={handleImageUser}
                />
              </div>
              <Button variant="default" type="submit" className="w-full mt-2">
                Register
              </Button>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <p>Already have an account?</p>
            <Link to="/login">
              <Button variant="link">Sign In Here</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
