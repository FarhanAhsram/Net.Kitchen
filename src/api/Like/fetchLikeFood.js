import axios from "axios";
import Swal from "sweetalert2";

export const fetchLikeFood = async (foodId) => {
  try {
    const response = await axios.post(
      "https://api-bootcamp.do.dibimbing.id/api/v1/like",
      foodId,
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = response.data;

    Swal.fire({
      title: "Liked Food",
      text: data.message,
      icon: "success",
      showConfirmButton: true,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
