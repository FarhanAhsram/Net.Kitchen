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
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className="bg-white rounded-xl w-full mx-12 lg:mx-24">
        <div className="grid lg:grid-cols-2 gap-2">
          <div className="flex justify-center items-center rounded-xl max-lg:hidden">
            <img src="../images/Auth2.avif" alt="" className="mx-auto w-4/5" />
          </div>
          <div className="grid items-center p-10 bg-[#77E4C8] rounded-r-lg">
            <div className="grid gap-4 items-center">
              <h1 className="text-4xl font-bold font-cursive">Register</h1>
              <p className="text-lg text-gray-600">
                Welcome to Net.Kitchen. Please fill this form below to make an
                account
              </p>
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
                    placeholder="Name"
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
                    placeholder="example@gmail.com"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5 my-2">
                  <div className="">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="mt-1"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="passwordRepeat"
                        name="passwordRepeat"
                        className="mt-1"
                        placeholder="Confirm Password"
                        required
                        onChange={handleChange}
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={toggleShowConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
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
                      onValueChange={(value) =>
                        setForm({ ...form, role: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
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
                      placeholder="08XXXXXXXXX"
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
    </div>
  );
}
