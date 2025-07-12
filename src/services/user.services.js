import axios from "axios";
import {URL} from '../constants/index.js'

const login = async (data) => {
  try {
    const resposne = await axios.post(
      `${URL}/user/logIn`,
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
      `${URL}/user/signUp`,
      data,
      { withCredentials: true }
    );
    return resposne.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

const updateUser = async (data) => {
  try {
    const resposne = await axios.post(
      `${URL}/user/updateUser`,
      data,
      { withCredentials: true }
    );
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
    const response = await axios.get(`${URL}/user/getAllUsers`, {
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

export { login, getAllUsers, signup, updateUser };
