import axios from "axios";
import Swal from "sweetalert2";

export const fetchRegister = async (userData) => {
  try {
    const response = await axios.post(
      "https://api-bootcamp.do.dibimbing.id/api/v1/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
      }
    );

    const data = response.data;

    return data;
  } catch (error) {
    Swal.fire({
      title: "Register Unsuccessful",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: true,
    });
  }
};
