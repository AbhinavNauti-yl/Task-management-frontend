import axios from "axios";

const login = async (data) => {
  try {
    const resposne = await axios.post(
      `http://localhost:8000/user/logIn`,
      data,
      {
        withCredentials: true,
      }
    );
    return resposne.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

const signup = async (data) => {
  try {
    const resposne = await axios.post(
      `http://localhost:8000/user/signUp`,
      data,
      { withCredentials: true }
    );
    console.log(resposne.data.data);
    return resposne.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/user/getAllUsers`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

export { login, getAllUsers, signup };
