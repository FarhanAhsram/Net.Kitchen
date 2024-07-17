import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchLogin } from "@/api/Auth/fetchLogin";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex bg-white rounded-xl shadow-lg w-2/3 p-5">
        <div className="w-1/2 p-2 max-lg:w-full">
          <div>
            <h1 className="text-xl">Login</h1>
            <p className="text-md">Welcome to this Website</p>
          </div>
          <div className="my-2">
            <form action="" onSubmit={handleLoginSubmit}>
              <Label>Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="my-2"
                placeholder="Email"
                required
                onChange={handleLoginChange}
              />
              <Label>Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                className="my-2"
                placeholder="Password"
                required
                onChange={handleLoginChange}
              />
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
        <div className="flex justify-center items-center w-1/2 max-lg:hidden">
          <h1>(Image)</h1>
        </div>
      </div>
    </div>
  );
}
