import axios from "axios";

export const fetchAddFood = async (foodData) => {
  try {
    const response = await axios.post(
      "https://api-bootcamp.do.dibimbing.id/api/v1/create-food",
      foodData,
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
