import axios from "axios";

export const fetchLogout = async () => {
  try {
    const response = await axios.get(
      "https://api-bootcamp.do.dibimbing.id/api/v1/logout",
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = response.data;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");

    return data;
  } catch (error) {
    console.log(error);
  }
};
