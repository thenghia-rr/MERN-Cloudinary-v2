import axios from "axios";
const API_URL = "http://localhost:3000";

const createUser = async ({ name, avatar }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("img", avatar);

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`${API_URL}/api/users`, formData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/users`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};


 export { createUser, getAllUsers};
