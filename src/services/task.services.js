import axios, { Axios } from "axios";

const taskAssignedToMe = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/task/assignedToMe`,
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
    const response = await axios.get(`http://localhost:8000/task/createdByMe`, {
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
    const response = await axios.get(`http://localhost:8000/task/${id}`, {
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
      `http://localhost:8000/task/createTask`,
      task ,
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
      `http://localhost:8000/task/${id}`,
      task ,
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

export { taskAssignedToMe, taskCreatedByMe, getTaskById, updateTask, createTask };
