import axios, { Axios } from "axios";
import {URL} from '../constants/index.js'

const taskAssignedToMe = async () => {
  try {
    const response = await axios.get(
      `${URL}/task/assignedToMe`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

const taskCreatedByMe = async () => {
  try {
    const response = await axios.get(`${URL}/task/createdByMe`, {
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

const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${URL}/task/${id}`, {
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

const createTask = async (task) => {
  try {
    const response = await axios.post(
      `${URL}/task/createTask`,
      task,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

const updateTask = async (id, task) => {
  try {
    const response = await axios.post(
      `${URL}/task/${id}`,
      task,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(error.message);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${URL}/task/${id}`, {
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

export {
  taskAssignedToMe,
  taskCreatedByMe,
  getTaskById,
  updateTask,
  createTask,
  deleteTask,
};
