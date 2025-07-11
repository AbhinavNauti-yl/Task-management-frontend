import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { taskService } from "../services/api";
import { sampleTasks } from "../data/sampleData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTask,
  taskAssignedToMe,
  taskCreatedByMe,
} from "../services/task.services";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("assigned");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  // fetching assigned tasks
  const {
    data: taskAssignedData,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => {
      return taskAssignedToMe();
    },
    queryKey: ["taskAssignedToMe"],
  });

  // fetching created tasks
  const {
    data: taskCreatedData,
    isPending: taskCreatedDataPending,
    isError: taskCreatedDataError,
  } = useQuery({
    queryFn: () => {
      return taskCreatedByMe();
    },
    queryKey: ["taskCreatedByMe"],
  });

  const {
    mutate: mutateDelete,
    isPending: deletePending,
    isError: deleteError,
  } = useMutation({
    queryFn: ["delete"],
    mutationFn: (id) => deleteTask(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        "user",
        "task",
        "taskAssignedToMe",
        "taskCreatedByMe",
      ]);
      toast.success("Task Deleted");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // running fetch task fn on reload andrerender
  useEffect(() => {
    fetchTasks();
  }, [activeTab, user, taskAssignedData, taskCreatedData]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      let fetchedTasks = [];
      switch (activeTab) {
        case "assigned":
          if (user) {
            taskAssignedToMe();
            fetchedTasks = taskAssignedData;
          }
          break;
        case "created":
          if (user) {
            taskCreatedByMe();
            fetchedTasks = taskCreatedData;
          }
          break;
        case "overdue":
          // Fetch overdue tasks
          // In real app: fetchedTasks = await taskService.getOverdueTasks();
          // For demo, filter sample data
          const today = new Date();
          fetchedTasks = sampleTasks.filter((task) => {
            if (!task.dueDate || task.status === "Completed") return false;
            const dueDate = new Date(task.dueDate);
            return dueDate < today;
          });
          break;
        default:
          fetchedTasks = [];
      }

      // Simulate API delay
      setTimeout(() => {
        setTasks(fetchedTasks);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please try again.");
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      mutateDelete(taskId);
    }
  };

  // handeling logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "assigned":
        return "Tasks Assigned to Me";
      case "created":
        return "Tasks Created by Me";
      case "overdue":
        return "Overdue Tasks";
      default:
        return "Tasks";
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 mt-10">
      {/* Sidebar / Header */}
      <div className="w-full md:w-64 bg-white shadow-md h-full">
        {/* Sidebar content */}
        <div className="p-6">
          <div className="hidden md:block">
            <div className="mt-2 text-sm text-gray-600">
              Welcome, {user?.name || "User"}!
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Dashboard
            </h2>
            <div className="mt-4 space-y-2">
              <button
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "assigned"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("assigned")}
              >
                <svg
                  className={`h-5 w-5 mr-2 ${
                    activeTab === "assigned" ? "text-blue-500" : "text-gray-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Tasks Assigned to Me
              </button>

              <button
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "created"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("created")}
              >
                <svg
                  className={`h-5 w-5 mr-2 ${
                    activeTab === "created" ? "text-blue-500" : "text-gray-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Tasks Created by Me
              </button>

              <button
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "overdue"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("overdue")}
              >
                <svg
                  className={`h-5 w-5 mr-2 ${
                    activeTab === "overdue" ? "text-blue-500" : "text-gray-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Overdue Tasks
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Actions
            </h2>
            <div className="mt-4 space-y-2">
              <Link
                to="/tasks/create"
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
              >
                <svg
                  className="h-5 w-5 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Task
              </Link>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm text-red-700 rounded-md hover:bg-red-50"
            >
              <svg
                className="h-5 w-5 mr-2 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{getTabTitle()}</h1>
          <Link
            to="/tasks/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Task
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        {/* Loading state */}
        {isPending || taskCreatedDataPending || loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            {tasks?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === "assigned" &&
                    "You don't have any tasks assigned to you."}
                  {activeTab === "created" &&
                    "You haven't created any tasks yet."}
                  {activeTab === "overdue" &&
                    "You don't have any overdue tasks."}
                </p>
                <Link
                  to="/tasks/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create a new task
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks?.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={() => handleDeleteTask(task._id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
