import axios from "axios";

export const fetchEditRole = async ({ id, userData }) => {
  try {
    const response = await axios.post(
      `https://api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
      userData,
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
