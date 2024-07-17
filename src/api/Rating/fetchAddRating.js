import axios from "axios";

export const fetchAddRating = async ({ id, ratingData }) => {
  try {
    const response = await axios.post(
      `https://api-bootcamp.do.dibimbing.id/api/v1/rate-food/${id}`,
      ratingData,
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};
