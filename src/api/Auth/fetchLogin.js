import axios from "axios";
import Swal from "sweetalert2";

export const fetchLogin = async (userData) => {
  try {
    const response = await axios.post(
      "https://api-bootcamp.do.dibimbing.id/api/v1/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
      }
    );

    const data = response.data;
    localStorage.setItem("accessToken", data.token);

    return data;
  } catch (error) {
    Swal.fire({
      title: "Login Unsuccessful",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: true,
    });
  }
};
