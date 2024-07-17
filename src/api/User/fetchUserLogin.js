import axios from "axios";

export const fetchUserLogin = async () => {
  try {
    const response = await axios.get(
      "https://api-bootcamp.do.dibimbing.id/api/v1/user",
      {
        headers: {
          "Content-Type": "application/json",
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = response.data;
    localStorage.setItem("role", data.user.role);

    return data;
  } catch (error) {
    console.log(error);
  }
};
