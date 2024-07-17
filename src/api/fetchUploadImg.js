import axios from "axios";

export const fetchUploadImg = async (imgData) => {
  try {
    const response = await axios.post(
      "https://api-bootcamp.do.dibimbing.id/api/v1/upload-image",
      imgData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = response.data.url;

    return data;
  } catch (error) {
    console.log(error);
  }
};
