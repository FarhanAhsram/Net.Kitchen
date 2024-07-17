import axios from "axios";

export const fetchGetIdFood = async (id) => {
  try {
    const response = await axios.get(
      `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${id}`,
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
