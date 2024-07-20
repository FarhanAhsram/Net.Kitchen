import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchLogin } from "@/api/Auth/fetchLogin";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchLogin(form);
      // console.log(response);
      if (response) {
        Swal.fire({
          title: "Login Successful",
          text: response.message,
          icon: "success",
          showConfirmButton: true,
        });

        if (response.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className="bg-white rounded-xl w-full mx-12 lg:mx-24">
        <div className="grid lg:grid-cols-2 gap-2">
          <div className="grid items-center p-12 bg-[#77E4C8] rounded-l-lg">
            <div className="grid gap-4 items-center">
              <h1 className="text-4xl font-bold font-cursive">Login</h1>
              <p className="text-lg text-gray-600">
                Welcome to Net.Kitchen. Please enter your Email and Password on
                this form below
              </p>
            </div>
            <div className="my-6 lg:m-0">
              <form action="" onSubmit={handleLoginSubmit}>
                <Label className="text-base">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="my-3"
                  placeholder="example@gmail.com"
                  required
                  onChange={handleLoginChange}
                />
                <Label className="text-base">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="my-3"
                    placeholder="Password"
                    required
                    onChange={handleLoginChange}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-gray-500" />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                </div>
                <Button variant="default" type="submit" className="w-full mt-2">
                  Login
                </Button>
              </form>
            </div>
            <div className="flex justify-center items-center">
              <p>Dont have an account?</p>
              <Link to="/register">
                <Button variant="link">Sign Up Here</Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center rounded-xl max-lg:hidden">
            <img src="../images/Auth1.avif" alt="" className="mx-auto w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
