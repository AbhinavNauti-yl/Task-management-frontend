import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/user.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/task.services";
import toast from "react-hot-toast";

const CreateTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { user } = useSelector((state) => state.auth);
  const [task, setTask] = useState({
    title: "Sample Title",
    description: "Sample Description",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Low",
    status: "To Do",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: task });

  // fetching all users for assignedTo users section
  const {
    data: allUsers,
    allUsersIsPending,
    allUsersIsError,
    error: allUsersError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getAllUsers();
    },
  });

  // creating new task
  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => createTask(task),
    mutationKey: ["createTask"],
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        "user",
        "task",
        "taskAssignedToMe",
        "taskCreatedByMe",
      ]);
      toast.success("Task Created");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    },
    onError: (error) => {
      toast.error(error.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    },
  });

  const onSubmit = async (data) => {
    try {
      // Format the date (if provided)
      if (data.dueDate) {
        data.dueDate = new Date(data.dueDate).toISOString().split("T")[0];
      }
      data.createdBy = user?._id;
      setTask(data);
      mutate(task);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
          <Link
            to="/dashboard"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Error message */}
        {isError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <p>{isError?.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Enter task title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Enter task description"
              {...register("description")}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                {...register("dueDate")}
              />
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                {...register("priority")}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                {...register("status")}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label
                htmlFor="assignedTo"
                className="block text-sm font-medium text-gray-700"
              >
                Assigned To
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                {...register("assignedTo")}
              >
                <option value="">Select a user</option>
                {allUsers?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/dashboard"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-4 hover:bg-gray-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              {isPending ? (
                <div className="w-5 h-5 mr-2 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              ) : null}
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
